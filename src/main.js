import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './main.css'
import { createI18n } from 'vue-i18n'

// Import your translation files
import en from './locales/en.json'  // adjust path if your folder is different
import de from './locales/de.json'

// Create i18n instance with imported messages
const i18n = createI18n({
  legacy: false,              // With this you can use I18n() in <script setup>
  locale: 'en',               // default language
  fallbackLocale: 'en',
  globalInjection: true,      // makes $t available globally (handy in templates)
  messages: {
    en: en.en,                // extract the "en" object from en.json
    de: de.de                 // extract the "de" object from de.json
  }
})

// load saved language from localStorage (if any)
const savedLanguage = localStorage.getItem('preferredLanguage')
if (savedLanguage && ['en', 'de'].includes(savedLanguage)) {
  i18n.global.locale.value = savedLanguage
}

// log for debugging (remove later if you want)
console.log('Loaded language from storage:', i18n.global.locale.value)

// Font Awesome setup
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, fab, far)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

// Register Font Awesome icon component globally
app.component('fa', FontAwesomeIcon)

app.mount('#app')