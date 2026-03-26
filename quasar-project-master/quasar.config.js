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
    },

    bin: {
      linuxAndroidStudio: '/home/marti.vilas.7e7/Escriptori/DADES/MartiVilas/M14/android-studio/bin/studio.sh'
    }

  }
})