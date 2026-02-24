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

    function formatMonthDay(dt) {
    if (!dt) return ''

    const timestamp = Number(dt) * 1000
    const date = new Date(timestamp)

    return date.toLocaleDateString(locale.value, {
        month: 'numeric',
        day: 'numeric'
    })
}

    return {curLanguage, toggleLanguage, formatMonthDay}
    },
    {persist: true}
)