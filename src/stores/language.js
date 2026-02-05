import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'


export const useLanguageStore = defineStore ( 'language', () => {
    const {locale} = useI18n({ useScope: 'global' })
    const curLanguage = ref('en')

    function toggleLanguage() {
        if (curLanguage.value === 'en') {
            curLanguage.value = 'de'
        } else {
            curLanguage.value = 'en'
        }
        locale.value = curLanguage.value
    }

    return {curLanguage, toggleLanguage}
    },
    {persist: true}
)