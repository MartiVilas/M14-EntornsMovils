import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],

    build: {
      vueRouterMode: 'hash'
    },

    devServer: {
      open: false
    },

    framework: {
      plugins: ['Notify', 'Dialog']
    }

  }
})