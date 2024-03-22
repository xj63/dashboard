<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <v-btn min-width="0" @click="toggle">
    <v-icon size="30">
      {{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
    </v-icon>
  </v-btn>
</template>
