// plugins/vuetify.ts
import {createVuetify} from 'vuetify'
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

    })

    nuxtApp.vueApp.use(vuetify)
})
