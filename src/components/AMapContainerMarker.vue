<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import DevicePosition from '@/pages/device-position.vue'

const props = defineProps<{ position?: String }>()

function parsePosition(position: String) {
  const regex = /(\d+\.?\d*)([NS]),\s*(\d+\.?\d*)([EW])/
  const match = position.match(regex)
  if (match) {
    let lat = parseFloat(match[1])
    let lng = parseFloat(match[3])
    if (match[2] === 'S') lat = -lat
    if (match[4] === 'W') lng = -lng
    return [lng, lat]
  } else {
    return [116.39, 39.9] // defaulf position
  }
}

const center = parsePosition(props.position || '116.39E, 39.9N')

let map: any = null
// Please let the child go, please don't use this key randomly.
// 求求放过孩子把，请不要乱用此key
const dcc = '1dcc6dde1d254412d7168878082d562f'

onMounted(() => {
  AMapLoader.load({
    key: dcc, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '2D', // 是否为3D地图模式
        zoom: 10, // 初始化地图级别
        center, // 初始化地图中心点位置
      })

      //创建一个 Marker 实例：
      // 添加marker
      const marker = new AMap.Marker({
        position: new AMap.LngLat(center[0], center[1]), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京',
      })
      //将创建的点标记添加到已有的地图实例：
      map.add(marker)
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  /* height: 800px; */
  height: 100%;
}
</style>
