// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const customDarkTheme = {
    dark: true,
    colors: {
        background: '#fff',
        surface: '#000000',
        primary: '#ffffff',
        secondary: '#ffffff',
        onBackground: '#ffffff',
        onSurface: '#ffffff',
        outline: '#ffffff',
    },
}

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({

        theme: {
            variations: {
                colors: ['primary', 'secondary'],
                lighten: 1,
                darken: 2,
            },
            defaultTheme: 'customDark',
            themes: {
                customDark: customDarkTheme,
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
