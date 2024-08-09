<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'

const toast = useToast()

const loading = ref<boolean>(false)
const turnstile = ref()
const token = ref()

const state = reactive({
  name: undefined,
  email: undefined,
  company: undefined,
  body: undefined
})

const showTurnstile = ref(false)
const canSend = computed(() => {
  return Boolean(state.name && state.email && state.company && state.body && token.value)
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.company) errors.push({ path: 'company', message: 'Required' })
  if (!state.body) errors.push({ path: 'body', message: 'Required' })
  if (!errors.length) {
    showTurnstile.value = true
  }
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  if (!event.data) return
  if (loading.value || !canSend.value) return

  loading.value = true

  await $fetch('https://api.nuxt.com/support/contact', {
    method: 'POST',
    body: {
      ...event.data,
      token: token.value
    }
  })
    .then(() => {
      state.company = ''
      state.name = ''
      state.email = ''
      state.body = ''
      showTurnstile.value = false
      toast.add({ title: 'Email sent', description: 'We will do everything possible to respond to you as quickly as possible', color: 'green' })
    })
    .catch((e) => {
      const description = e.data?.message || 'Something went wrong. Please try again later.'
      toast.add({ title: 'Email sending failed', description, color: 'red' })
    })
    .finally(() => {
      loading.value = false
      // reset turnstile token
      turnstile.value?.reset()
    })
}
</script>

<template>
  <div class="flex flex-col lg:flex-row">
    <div class="w-full">
      <UCard :ui="{ background: 'form-bg', body: { base: 'flex flex-col space-y-6 w-full', padding: 'px-4 py-5 sm:p-8' } }">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-6"
          @submit="onSubmit"
        >
          <UFormGroup
            label="Name"
            name="name"
            required
          >
            <UInput
              v-model="state.name"
              placeholder="John Doe"
            />
          </UFormGroup>

          <UFormGroup
            label="Company Email"
            name="email"
            required
          >
            <UInput
              v-model="state.email"
              type="email"
              placeholder="you@example.com"
            />
          </UFormGroup>

          <UFormGroup
            label="Company"
            name="company"
            required
          >
            <UInput
              v-model="state.company"
              placeholder="Your company name"
            />
          </UFormGroup>

          <UFormGroup
            label="What can we help you achieve?"
            name="body"
            required
          >
            <UTextarea
              v-model="state.body"
              autoresize
              placeholder="Tell us how we can help you"
              :rows="6"
            />
          </UFormGroup>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <!-- <div class="text-gray-700 dark:text-gray-400" v-html="form.info" /> -->
          <ClientOnly>
            <NuxtTurnstile
              v-if="showTurnstile"
              ref="turnstile"
              v-model="token"
              :options="{ theme: $colorMode.value }"
            />
          </ClientOnly>

          <UButton
            label="Send message"
            icon="i-ph-paper-plane-right-duotone"
            type="submit"
            color="gray"
            class="w-fit pt-2"
            :loading="loading"
            :disabled="!canSend"
          />
        </UForm>
      </UCard>
    </div>

    <UDivider
      label="O"
      color="gray"
      orientation="vertical"
      class="hidden lg:flex w-[40%] py-16"
      :ui="{ label: 'text-xl py-8' }"
    />
    <UDivider
      label="O"
      color="gray"
      class="lg:hidden py-16"
      :ui="{ label: 'text-xl py-8' }"
    />

    <div class="w-full flex items-start justify-center flex-col">
      <MDC
        value="## Talk to us"
        class="prose dark:prose-invert"
      />
      <p>
        Book 30 minutes with us to learn more about our support solutions, present your needs and your project, and get personalized proposals to solve your issues.
      </p>
      <UButton
        class="mt-8"
        color="gray"
        label="Choose a meeting"
        icon="i-ph-calendar-plus-duotone"
        to="https://calendly.com/nuxt-experts/introduction"
        target="_blank"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.dark .form-bg {
  background: linear-gradient(0deg, rgba(15, 23, 42, 0.50) 0%, rgba(15, 23, 42, 0.50) 100%), linear-gradient(180deg, rgba(51, 65, 85, 0.50) 0%, rgba(2, 4, 32, 0.50) 33.92%) !important;
}
</style>
