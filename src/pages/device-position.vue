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
</script>

<template>
  <div>hello {{ route.query.id }}</div>
</template>
