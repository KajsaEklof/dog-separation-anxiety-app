import { defineNuxtConfig } from '@nuxt/bridge'
// Import FontAwesome icons
// import { faGlobeAfrica, faEnvelope, faPaw } from '@fortawesome/free-solid-svg-icons'
// import customTheme from './assets/custom-theme'

export default defineNuxtConfig({
  // Your existing configuration
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'dog-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  bridge: {
    // meta: true,
    imports: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    "~/assets/styles/main.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   // https://go.nuxtjs.dev/typescript
  //   // '@nuxt/typescript-build',
  // ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    '@pinia/nuxt',
  ],
  // chakra: {
  //   icons: {
  //     // Here we state that we use `fa`
  //     // icons library for Chakra's
  //     // internal icon parser
  //     iconPack: 'fa',
  //     iconSet: {
  //       faGlobeAfrica,
  //       faEnvelope,
  //       faPaw
  //     }
  //   },
  //   extendTheme: customTheme,
  //   // extendTheme: {
  //   //   colors: {
  //   //     stone: '#CAD2C5',
  //   //     apple: '#84A98C',
  //   //     sage: '#52796F',
  //   //     teal: '#354F52',
  //   //     navy: '#2F3E46'
  //   //   }
  //   // }
  // },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

})
