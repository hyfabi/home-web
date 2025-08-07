// plugins/vuetify.ts
import {createVuetify, type ThemeDefinition} from 'vuetify'
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
            themes: {
                dark: true,

            }
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
