// src/stores/image.js

import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location'   // ← adjust path if your file is named differently (e.g. useLocation.js)

export const useImageStore = defineStore('image', () => {
  const pexelsApiKey = 'CYJ2yN02aKa6NXFHENRS20ck9BV76yEJYQyWwiWaZt1wYBV1pv6sJfhE'
  const cityImage = ref('')
  const isLoading = ref(false)
  const error = ref(null)

  // Call the other store here (inside the setup function — this is safe)
  const locationStore = useLocationStore()
  const { city } = storeToRefs(locationStore)

  let debounceTimer = null

  watch(city, (newCity) => {
    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {
     const trimmed = (newCity ?? '').trim()

      if (!trimmed) {
        cityImage.value = ''
        isLoading.value = false
        error.value = null
        return
      }
      
      if (isLoading.value) return

      isLoading.value = true
      error.value = null

      try {
        const query = `${newCity.trim()} skyline landscape`.trim()
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`

        const res = await fetch(url, {
          headers: { Authorization: pexelsApiKey }
        })

        if (!res.ok) throw new Error(`Pexels HTTP ${res.status}`)

        const data = await res.json()

        if (data.photos?.length > 0) {
          const rand = Math.floor(Math.random() * data.photos.length)
          cityImage.value = data.photos[rand].src.large2x
        } else {
          throw new Error('No photos returned from Pexels')
        }
      } catch (err) {
        console.warn('Pexels image load error:', err)
        error.value = err.message

        cityImage.value = `https://source.unsplash.com/random/1920x1080?${encodeURIComponent(newCity)},skyline`
      } finally {
        isLoading.value = false
      }
    }, 500)
  }, { immediate: true })

  return { cityImage, isLoading, error }
}, {
  persist: false
})