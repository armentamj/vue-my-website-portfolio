import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'


export const useLanguageStore = defineStore ( 'language', () => {
    const {t} = useI18n()
    const curLanguage = ref(null)
    const languages = ref(['en', 'de'])

    function setLanguage(lang) {
        if (!languages.value.includes(lang)) throw new Error(t("This langauge is not supported."))
        curLanguage.value = lang
    }

    return {curLanguage, languages, setLanguage}
    },
    {persist: true}
)