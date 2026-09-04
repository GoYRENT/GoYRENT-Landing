// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@pinia/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/turnstile'
  ],

  turnstile: {
    siteKey: process.env.NUXT_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
  },

  css: ['~/assets/css/main.css'],

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    }
  },

  ui: {
    // icons handled via @nuxt/icon, collections auto-detected
  },

  colorMode: {
    disableTransition: true
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },

  routeRules: {
    '/': { prerender: false },
    '/api/search.json': { prerender: false },
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: false
    }
  },

  // server: {
  //   port: process.env.PORT || 3000 // Usa el valor de la variable de entorno PORT o 3001 como predeterminado
  // },

  devtools: {
    enabled: true
  },

  typescript: {
    strict: false
  },

  future: {
    compatibilityVersion: 4
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  compatibilityDate: '2025-07-15'
})
