// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  devServer:{
    host: '0.0.0.0',
    port: 80
  },

  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-custom-media': {}
    }
  },

  plugins: [{ src: '~/plugins/mqtt.client.ts', mode: 'client' }],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
  ],
  css: ['@/assets/scss/default.scss'],

  runtimeConfig: {
    // Private variables, only available on server

    // Public variables, available on client and server
    public: {
      mqttServerBaseUrl: '10.0.0.103',
    }
  }

})