import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import '@/assets/styles.scss'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fff",
    primary: "#275d57", //"#006d3e",
    "on-primary": "#ffffff",
    "primary-container": "#8df8b5",
    "on-primary-container": "#00210f",
    secondary: "#006d43",
    "on-secondary": "#ffffff",
    "secondary-container": "#91f7bd",
    "on-secondary-container": "#002111",
    tertiary: "#006497",
    "on-tertiary": "#ffffff",
    "tertiary-container": "#cce5ff",
    "on-tertiary-container": "#001e31",
    error: "#ba1a1a",
    " error-container": "#ffdad6",
    "on-error": "#ffffff",
    "on-error-container": "#410002",
    "on-background": "#191c1a",
    surface: "#dce5db", // "#fbfdf8",
    "on-surface": "#191c1a",
    surfaceVariant: "#dce5db",
    onSurfaceVariant: "#414942",
    outline: "#717971",
    "inverse-on-surface": "#f0f1ec",
    "inverse-surface": "#2e312e",
    "inverse-primary": "#71db9a",
    shadow: "#000000",
    "surface-tint": "#006d3e",
    "outline-variant": "#c0c9c0",
    scrim: "#000000"

    // --md - sys - color - on - primary - container: var(--md - sys - color - on - primary - container - light),
    // --md - sys - color - secondary: var(--md - sys - color - secondary - light),
    // --md - sys - color - on - secondary: var(--md - sys - color - on - secondary - light),
    // --md - sys - color - secondary - container: var(--md - sys - color - secondary - container - light),
    // --md - sys - color - on - secondary - container: var(--md - sys - color - on - secondary - container - light),
    // --md - sys - color - tertiary: var(--md - sys - color - tertiary - light),
    // --md - sys - color - on - tertiary: var(--md - sys - color - on - tertiary - light),
    // --md - sys - color - tertiary - container: var(--md - sys - color - tertiary - container - light),
    // --md - sys - color - on - tertiary - container: var(--md - sys - color - on - tertiary - container - light),
    // --md - sys - color - error: var(--md - sys - color - error - light),
    // --md - sys - color - error - container: var(--md - sys - color - error - container - light),
    // --md - sys - color - on - error: var(--md - sys - color - on - error - light),
    // --md - sys - color - on - error - container: var(--md - sys - color - on - error - container - light),
    // --md - sys - color - background: var(--md - sys - color - background - light),
    // --md - sys - color - on - background: var(--md - sys - color - on - background - light),
    // --md - sys - color - on - surface: var(--md - sys - color - on - surface - light),
    // --md - sys - color - surface - variant: var(--md - sys - color - surface - variant - light),
    // --md - sys - color - on - surface - variant: var(--md - sys - color - on - surface - variant - light),
    // --md - sys - color - outline: var(--md - sys - color - outline - light),
    // --md - sys - color - inverse - on - surface: var(--md - sys - color - inverse - on - surface - light),
    // --md - sys - color - inverse - surface: var(--md - sys - color - inverse - surface - light),
    // --md - sys - color - inverse - primary: var(--md - sys - color - inverse - primary - light),
    // --md - sys - color - shadow: var(--md - sys - color - shadow - light),
    // --md - sys - color - surface - tint: var(--md - sys - color - surface - tint - light),
    // --md - sys - color - outline - variant: var(--md - sys - color - outline - variant - light),
    // --md - sys - color - scrim: var(--md - sys - color - scrim - light),
    // surface: '#FFF8E1', // amber-lighten-5
    // primary: '#6200EE',
    // 'primary-darken-1': '#3700B3',
    // secondary: '#03DAC6',
    // 'secondary-darken-1': '#018786',
    // error: '#B00020',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FB8C00',
  }
}
// const darkTheme: ThemeDefinition = {
//   dark: true,
//   colors: {
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     primary: '#6200EE',
//     'primary-darken-1': '#3700B3',
//     secondary: '#03DAC6',
//     'secondary-darken-1': '#018786',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// }

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      // darkTheme
    }
  }
})

createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .mount('#app');
