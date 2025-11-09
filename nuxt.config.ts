// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer:{
    host: '0.0.0.0',
    port: 80,
    
  },

  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'vuetify-nuxt-module',
  ],

  ssr: false,

  runtimeConfig: {
    // Private variables, only available on server
    public: {
      mqttServerBaseUrl: '10.0.0.103',
    }
  },

  plugins: [
    { src: '~/plugins/mqtt.client.ts', mode: 'client' },
  ],

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },
  app:{
    pageTransition: { name: 'page', mode: 'out-in' },

  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  css: ['vuetify/styles', '@/assets/settings.scss'],

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: false,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },

      // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
      // disableVuetifyStyles: true,
      styles: {
        configFile: 'assets/settings.scss',
      },
    },
  },
})