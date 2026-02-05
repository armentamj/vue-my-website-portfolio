import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModeStore = defineStore('mode', () => {
  // current mode starts off as 'light' mode
  const currentMode = ref('light')

  // the three modes (hard-coded, always correct so no safety checks)
  const displayModes = ref(['light', 'dark', 'relax'])

  // when the app starts this code checks if we saved something to localStorage called 'mode'
  const savedMode = localStorage.getItem('mode')

  if (savedMode) {
    // use the variable savedMode which is set by the mode bar
    currentMode.value = savedMode
  } else {
    // saving the mode you picked to the localStorage to be used in the future
    localStorage.setItem('mode', 'light')
  }

  // This runs when you click any of the  mode buttons
  function setMode(newMode) {
    currentMode.value = newMode            // change the mode
    localStorage.setItem('mode', newMode)  // remember it for next time
  }

  // Give your components access to these
  return { currentMode, displayModes, setMode }
})