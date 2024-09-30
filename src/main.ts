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
import { VDateInput } from 'vuetify/labs/VDateInput'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import '@/assets/styles.scss'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fff", // "#fffdf5", //"#fff",
    primary: "#6750A4", //"#ffdad6", //"#331a49", // "#1c0135", // "#ed5557", //"#275d57", //"#006d3e",
    "on-primary": "##FFFFFF",
    "primary-container": "#EADDFF",
    "on-primary-container": "#EADDFF",
    secondary: "#625B71",
    "on-secondary": "#ffffff",
    "secondary-container": "#E8DEF8",
    "on-secondary-container": "#4A4458",
    tertiary: "#7D5260",
    "on-tertiary": "#ffffff",
    "tertiary-container": "#FFD8E4",
    "on-tertiary-container": "#633B48",
    error: "#ba1a1a",
    "error-container": "#ffdad6",
    "on-error": "#ffffff",
    "on-error-container": "#410002",
    "on-background": "#191c1a",
    surface: "#FEF7FF",// "#cce5ff",// "#f3e3d2", //"#dce5db", // "#fbfdf8",
    "on-surface": "#1D1B20",
    surfaceVariant: "#E7E0EC",
    onSurfaceVariant: "#49454F",
    outline: "#79747E",
    "inverse-on-surface": "##322F35",
    "inverse-surface": "#2e312e",
    "inverse-primary": "#71db9a",
    shadow: "#000000",
    "surface-tint": "#6750A4",
    "outline-variant": "#CAC4D0",
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
  components: {
    ...components,
    VDateInput,
  },
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
  .use(vuetify)
  .use(createPinia())
  .mount('#app');
