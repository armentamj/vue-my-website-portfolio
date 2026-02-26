// src/stores/image.js
import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location'

let debounceId = null

export const useImageStore = defineStore('image', () => {
  const cityImage = ref('')
  const isLoading = ref(false)
  const error = ref(null)

  const locationStore = useLocationStore()
  const { city, location } = storeToRefs(locationStore)


  // Watch the typed city (triggers debounced load)
  watch(city, () => {
    clearTimeout(debounceId)

    // If user cleared the input, immediately clear image
    if (!city.value.trim()) {
      cityImage.value = ''
      error.value = null
      return
    }

    // Debounce, but only attempt to load if we already have valid location data
    debounceId = setTimeout(() => {
      if (location.value?.length > 0 && location.value[0]?.name) {
        loadImage()
      }
      // If no valid location yet, we just wait (the location watcher will catch it later)
    }, 300)
  })


  // Watch the resolved location (main trigger after successful geocode)

  watch(location, (newLoc) => {
    if (newLoc?.length > 0 && newLoc[0]?.name?.trim()) {
      loadImage()
    } else {
      // Clear image when location becomes invalid/empty
      cityImage.value = ''
      error.value = null
    }
  }, { immediate: true })   // runs once on store creation, good for initial load


  // Core image loading logic

  async function loadImage() {
    // Safety double-check
    if (!location.value?.length || !location.value[0]?.name?.trim()) {
      cityImage.value = ''
      isLoading.value = false
      return
    }

    if (isLoading.value) return

    isLoading.value = true
    error.value = null

    try {
      const cityName = location.value[0].name.trim()
      const query = `${cityName} skyline`

      let baseUrl = ''
      if (window.location.host.includes('localhost')) baseUrl = '/pb'
      const res = await fetch(`${baseUrl}/image/${encodeURIComponent(query)}`)

      if (!res.ok) {
        throw new Error(`Image endpoint returned HTTP ${res.status}`)
      }

      const data = await res.json()

      if (data.photos?.length > 0) {
        const rand = Math.floor(Math.random() * data.photos.length)
        cityImage.value = data.photos[rand].src.large2x
      } else {
        throw new Error('No photos returned from Pexels')
      }
    } catch (err) {
      console.warn('Image load failed:', err)
      error.value = err.message

      // Fallback image (using unsplash or similar)
      cityImage.value = `https://source.unsplash.com/random/1920x1080?${encodeURIComponent(city.value)},city,skyline`
    } finally {
      isLoading.value = false
    }
  }

  return {
    cityImage,
    isLoading,
    error
  }
}, {
  persist: false
})