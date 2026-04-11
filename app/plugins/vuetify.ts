// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import {md3} from "vuetify/blueprints";

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
        blueprint: md3,
        theme: {
            variations: {
                colors: ['primary', 'secondary'],
                lighten: 1,
                darken: 2,
            },
            defaultTheme: 'customDark',
            themes: {
                dark: true,

            }
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
