<template>
    <div class="mode">
      <a @click="setMode('light')" :title="$t('mode.light')"><fa icon="sun" class="hell svg" /></a>
      <a @click="setMode('dark')" :title="$t('mode.dark')"><fa icon="moon" class="dunkel svg" /></a>
      <a @click="setMode('relax')" :title="$t('mode.relax')"><fa icon="umbrella-beach" class="entspannen svg" /></a>
      <a @click="changeLanguage" :title="$t('mode.language_title')">{{ $t('mode.language') }}</a>
    </div>
</template>
<script setup>
import { useModeStore } from '@/stores/mode.js'
import { useI18n } from 'vue-i18n'

// Get reactive locale from i18n
const { locale } = useI18n()

function changeLanguage() {
  // Toggle between en and de
  const newLang = locale.value === 'en' ? 'de' : 'en'

  // Apply the change
  locale.value = newLang

  // Save to localStorage so it persists
  localStorage.setItem('preferredLanguage', newLang)
}

const modeStore = useModeStore()
const { setMode } = modeStore

</script>
<style>
/* This is the main container of the mode bar */
.mode {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  top: 0;
  right: 0;
  width: 47px;
  box-shadow: -8px 8px 15px rgba(0, 0, 0, 0.2);
}

/* This is for the children of the mode bar ie the anchor tags. */
.mode a {
  font-weight: bold;
  text-decoration: none;
  font-size: 140%;
  text-align: center;
  cursor: pointer;
}

/* This highlights the light mode icon */
.light .hell {
  border-bottom: solid red 3px;
  box-sizing: border-box;
}

/* This highlights the dark mode icon */
.dark .dunkel {
  border-bottom: solid red 3px;
  box-sizing: border-box;
}

/* This highlights the relax mode icon */
.relax .entspannen {
  border-bottom: solid red 3px;
  box-sizing: border-box;
}

/* The hover effects for the mode bar's icons are defined in the Main.css file under (.light a:hover, .dark a:hover, .relax a:hover) and count for both the navbar and the mode bar. */

</style>