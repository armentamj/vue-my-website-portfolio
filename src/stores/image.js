// src/stores/image.js

import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location'   // ← adjust path if your file is named differently (e.g. useLocation.js)
let debounceId = null

export const useImageStore = defineStore('image', () => {
  const cityImage = ref('')
  const isLoading = ref(false)
  const error = ref(null)

  // Call the other store here (inside the setup function — this is safe)
  const locationStore = useLocationStore()
  const { city } = storeToRefs(locationStore)

  watch(city, () => {
    clearTimeout(debounceId)
    if(city.value === "") return

    debounceId = setTimeout(loadData, 250)
  })


  const loadData = async function() {
    if (isLoading.value) return

     const trimmed = (city.value ?? '').trim()

      if (!trimmed) {
        cityImage.value = ''
        isLoading.value = false
        error.value = null
        return
      }
      

      isLoading.value = true
      error.value = null

      try {
        const query = `${city.value.trim()} skyline landscape`.trim()
        const url = `/pb/image/${query}`

        const res = await fetch(url)

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

        cityImage.value = `https://source.unsplash.com/random/1920x1080?${encodeURIComponent(city.value)},skyline`
      } finally {
        isLoading.value = false
      }

  }

  if (!cityImage.value && city.value && !isLoading.value) loadData() 

  return { cityImage, isLoading, error }
}, {
  persist: false
})