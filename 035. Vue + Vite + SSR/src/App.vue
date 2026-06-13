<script setup>
import { ref } from 'vue'
const count = ref(0)
const time = new Date().toLocaleTimeString()
</script>

<template>
  <div class="container">
    <h1>Vue + Vite + SSR</h1>
    <p>服务端渲染时间：{{ time }}</p>
    <button @click="count++">客户端 hydration 后可点击：{{ count }}</button>
  </div>
</template>

<style>
.container {
  font-family: sans-serif;
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
