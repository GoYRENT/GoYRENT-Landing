<script setup lang="ts">
const columns = [{
  label: 'Resources',
  children: [{
    label: 'Centro de ayuda',
    to: '/docs'
  }, {
    label: 'Docs',
    to: '/docs'
  }, {
    label: 'Roadmap',
    to: '/docs'
  }, {
    label: 'Changelog',
    to: '/docs'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates',
    to: '#'
  }, {
    label: 'Portal',
    to: '#'
  }, {
    label: 'Expertos de GOYRENT',
    to: '/enterprise/experts'
  }, {
    label: 'Sponsors',
    to: '#'
  }]
}, {
  label: 'Empresa',
  children: [{
    label: 'Acerca de',
    to: '/enterprise/about'
  },
  {
    label: 'Soporte para negocios',
    icon: 'i-heroicons-play-circle',
    to: '/enterprise/support'
  }, {
    label: 'Precios',
    to: '/pricing'
  }, {
    label: 'Condiciones del servicio',
    to: '/enterprise/agreement'
  }, {
    label: 'Política de privacidad',
    to: '/enterprise/privacy-policy'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  setTimeout(() => {
    toast.add({
      title: 'Subscribed!',
      description: 'You\'ve been subscribed to our newsletter.'
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <UFooter :ui="{ top: 'border-t border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Subscribe to our newsletter"
                :ui="{ container: 'mt-3' }"
              >
                <UInput
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  size="xl"
                  autocomplete="off"
                  class="max-w-sm"
                  :ui="{ base: 'rounded-full' }"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="primary"
                      variant="solid"
                      :label="loading ? 'Subscribing' : 'Subscribe'"
                      :loading="loading"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <UButton
        to="https://github.com/nuxt-ui-pro/saas"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
