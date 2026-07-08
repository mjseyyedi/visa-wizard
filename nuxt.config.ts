export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt'],

  css: ['~/assets/css/variables.css', '~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY ?? '',
    },
  },

  vite: {
    test: {
      environment: 'happy-dom',
      globals: true,
    },
  },
})
