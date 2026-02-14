import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const apiKey = '46c9ee8f1274c2734c84066d7b4ffabe'
let debounceId = null

export const useLocationStore = defineStore ( 'location', () => {
    const city = ref('')
    const location = ref(null)

    watch(city, () => {
        clearTimeout(debounceId)

        debounceId = setTimeout(() => {
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${apiKey}`).then(async (res) => {
                location.value = await res.json()
            })
        }, 500)
        
    })

    return {city,location}
    },
    {persist: true}
)
