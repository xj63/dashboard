<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

definePage({
  meta: {
    icon: 'mdi-map',
    title: 'Map Chart',
    drawerIndex: 5,
  },
})
</script>

<template>
  <BMapECharts />
</template>
