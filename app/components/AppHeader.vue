<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const userStore = useUserStore()
function logout() {
  userStore.removeToken()
}

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const links = [{
  label: 'Industrias',
  to: '/industries'
}, {
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Precios',
  to: '/pricing'
},
{
  label: 'Clientes',
  icon: 'i-heroicons-square-3-stack-3d',
  children: [{
    label: 'Sitios de clientes',
    to: '/',
    icon: 'i-ph-storefront-duotone',
    description: 'Visita las diferentes tiendas de nuestros clientes.'
  }, {
    label: 'Historias de clientes',
    to: '/customer-stories',
    icon: 'i-ph-book-open-duotone',
    description: 'Entérate de las diferentes historias inspiradoras.'
  }]
}, {
  label: 'Recursos',
  icon: 'i-heroicons-square-3-stack-3d',
  children: [
    {
      label: 'Blog',
      to: '/blog',
      icon: 'i-ph-newspaper-duotone',
      description: 'A simple pricing, for solo developers or teams.'
    }, {
      label: 'Expertos de GOYRENT',
      to: '/enterprise/experts',
      icon: 'i-ph-users-four-duotone',
      description: 'Contacta con expertos de GOYRENT para que te ayudemos a crecer en tu negocio.'
    }, {
      label: 'Centro de ayuda',
      to: '/help',
      icon: 'i-ph-question-duotone',
      description: 'Get started with one of our official templates.'
    },
    {
      label: 'Acerca de',
      to: '/enterprise/about',
      icon: 'i-ph-info-duotone',
      description: 'Get started with one of our official templates.'
    }]
}
]
</script>

<template>
  <UHeader>
    <template #title>
      GoYRENT <UBadge
        label="PRO"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <UNavigationMenu
      :items="links"
      variant="link"
      class="hidden lg:flex"
    />

    <template #right>
      <UColorModeButton />
      <UContentSearchButton />

      <template v-if="userStore.user.isAuthenticated">
        <UButton
          label="Abrir aplicación"
          color="primary"
          variant="solid"
          to="/login"
        />

        <UButton
          label="Cerrar sesión"
          color="neutral"
          variant="ghost"
          @click="logout"
        />
      </template>

      <template v-else>
        <UButton
          label="Iniciar sesión"
          color="neutral"
          variant="ghost"
          to="/login"
        />
        <UButton
          label="Probar gratis"
          icon="i-heroicons-arrow-right-20-solid"
          trailing
          color="primary"
          variant="solid"
          to="/pricing"
          class="hidden lg:flex"
        />
        <!-- <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="neutral" to="/signup" class="hidden lg:flex" /> -->
      </template>
    </template>

    <template #body>
      <UNavigationMenu
        :items="links"
        orientation="vertical"
        class="-mx-2.5"
      />
      <USeparator class="my-4" />
      <UContentNavigation
        :navigation="navigation"
        default-open
      />
    </template>
  </UHeader>
</template>
