// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'

export default createVuetify({
  theme: {
    defaultTheme: 'portfolioDark',
    themes: {
      portfolioDark: {
        dark: true,
        colors: {
          background: '#08080e',
          surface: '#0f0f18',
          primary: '#7c6af7',
          secondary: '#4ed8c0',
          accent: '#f06fba',
          error: '#f06fba',
          info: '#4ed8c0',
          success: '#4ed8c0',
        },
      },
    },
  },
  components: {
    ...components,
    ...labsComponents,
  },
})