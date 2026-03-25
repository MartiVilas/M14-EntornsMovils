export default defineNuxtConfig({
  srcDir: 'app/',
  modules: ['@nuxt/ui', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    session: {
      password: '',
      maxAge: 60 * 60 * 24 * 7
    },
    mobileTokenSecret: ''
  }
})