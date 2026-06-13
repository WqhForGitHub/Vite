<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
</script>

<template>
  <h1>Vite Devtools 插件 demo</h1>
  <p>
    <button @click="count++">count = {{ count }}</button>
    double = {{ double }}
  </p>
  <ul>
    <li>页面右下角悬浮球：vite-plugin-vue-devtools</li>
    <li>访问 <a href="/__inspect/" target="_blank">/__inspect/</a> 查看模块转换链</li>
  </ul>
</template>
