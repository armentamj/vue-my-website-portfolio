<template>
  <div :class="currentMode" style="min-height: 100vh">
    <PageNav />
    <ModeBar />
    <div class="router">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
import PageNav from '../components/PageNav.vue';
import ModeBar from '../components/ModeBar.vue';

import { useModeStore } from '@/stores/mode';
import { storeToRefs } from 'pinia';

const modeStore = useModeStore()
const { currentMode } = storeToRefs(modeStore)

</script>
<style>
</style>
