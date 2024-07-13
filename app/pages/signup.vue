<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up'
})

const fields = [{
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter your name'
}, {
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
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
  color: 'gray' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]

function onSubmit (data: any) {
  console.log('Submitted', data)
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
      align="top"
      title="Crear una cuenta"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Crear cuenta' }"
      @submit="onSubmit"
    >
      <template #description>
        ¿Ya tienes una cuenta? <NuxtLink to="/login" class="text-primary font-medium">Iniciar sesión</NuxtLink>.
      </template>

      <template #footer>
        Al registrarte, aceptas nuestros <NuxtLink to="/enterprise/agreement" class="text-primary font-medium">Términos y Condiciones</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
