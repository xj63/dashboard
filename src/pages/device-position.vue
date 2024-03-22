<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

definePage({
  meta: {
    icon: 'mdi-map-marker',
    title: 'Device Position',
    drawerIndex: 4,
  },
})

const positionQuery = route.query.position
const position: String = typeof positionQuery == 'string' ? positionQuery : ''
</script>

<template>
  <AMapContainerMarker :position="position" />
</template>
