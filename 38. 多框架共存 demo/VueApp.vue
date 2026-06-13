<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p>这是一个 Vue 3 组件。</p>
  <button @click="count++">Vue count: {{ count }}</button>
</template>

<style scoped>
button {
  padding: 0.4rem 0.8rem;
  background: #41b883;
  color: white;
  border: 0;
  cursor: pointer;
}
</style>
