import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModeStore = defineStore('mode', () => {
  // current mode starts off as 'light' mode
  const currentMode = ref('light')

  // the three modes (hard-coded, always correct so no safety checks)
  const displayModes = ref(['light', 'dark', 'relax'])

  // This runs when you click any of the  mode buttons
  function setMode(newMode) {
    currentMode.value = newMode            // change the mode
  }

  // Give your components access to these
  return { currentMode, displayModes, setMode }
},{
  persist: true
})
