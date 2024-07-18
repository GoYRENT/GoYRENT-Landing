<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login'
})

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const errors = ref([])
const loading = ref(false)

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Correo electrónico',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Contraseña',
  type: 'password',
  placeholder: 'Enter your password'
}]

const validate = (state: any) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const providers = [{
  label: 'Continuar con Google',
  icon: 'i-simple-icons-google',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to Google')
  }
}]

function onSubmit(data: any) {
  console.log('Submitted', data)
}

async function submitForm(state: any) {
  console.log('submitForm')

  errors.value = []
  loading.value = true

  await $fetch('http://127.0.0.1:8000/api/v1/token/login/', {
    method: 'POST',
    body: JSON.stringify({
      username: state.email,
      password: state.password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((data) => {
      console.log('response', data.auth_token)

      userStore.setToken(data.auth_token, state.email.value)
      loading.value = false

      router.push({ path: '/' })
    })
    .catch((error) => {
      if (error.response) {
        for (const property in error.response._data) {
          errors.value.push(`${error.response._data[property]}`)
        }

        for (let i = 0; i < errors.value.length; i++) {
          const msg = errors.value[i]
          toast.add({ icon: 'i-heroicons-exclamation-triangle', color: 'red', title: 'Inicio se sesión fallido', description: msg })
        }

        console.log(JSON.stringify(error.response))
        loading.value = false
      } else if (error.message) {
        errors.value.push('Something went wrong. Please try again')

        console.log(JSON.stringify(error))
        toast.add({ icon: 'i-heroicons-exclamation-triangle', color: 'red', title: 'Inicio se sesión fallido', description: 'Ha ocurrido un error desconocido.' })
        loading.value = false
      }
    })
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Bienvenido a GoYRENT"
      align="top"
      icon="i-heroicons-lock-closed"
      :loading="loading"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid', label: 'Iniciar sesión' }"
      @submit="submitForm"
    >
      <template #description>
        ¿No tienes una cuenta? <NuxtLink
          to="/signup"
          class="text-primary font-medium"
        >Registrarme</NuxtLink>

      </template>

      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >¿Olvidaste la contraseña?</NuxtLink>
      </template>

      <template #footer>
        Al iniciar sesión, aceptas la <NuxtLink
          to="/enterprise/privacy-policy"
          class="text-primary font-medium"
        > política de privacidad</NuxtLink> y los <NuxtLink
          to="/enterprise/agreement"
          class="text-primary font-medium"
        >términos y condiciones</NuxtLink> de GoYRENT.
      </template>
    </UAuthForm>
  </UCard>
</template>
