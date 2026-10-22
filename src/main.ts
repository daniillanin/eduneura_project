import './assets/main.scss'

import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'

import { supabase } from './database/supabase';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primeuix/themes/aura';
import { definePreset } from "@primeuix/themes"
const customPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
});

import App from './App.vue'
import router from './router'

let app: VueApp
supabase.auth.onAuthStateChange((event, session) => {
if(!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(PrimeVue, {
        theme: {
            preset: customPreset,
            options: {
                darkModeSelector: false,
            }
        }
    })
    app.use(ToastService)
    app.mount('#app')
} 
if(session?.user) {
    console.log(`Активная сессия пользователя: ${session.user.email}`)
} else {
    console.log("Нет активной сессии");
}
})