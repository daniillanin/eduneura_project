import './assets/main.scss'

import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'

import { supabase } from './database/supabase';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primeuix/themes/aura';

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
            preset: Aura,
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