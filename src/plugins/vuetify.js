// Vuetify
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

import { createVuetify, ThemeDefinition } from 'vuetify'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader



const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  icons: {
    // This is already the default value - only for display purposes
    defaultSet: 'mdi', 
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  }
})

export default vuetify