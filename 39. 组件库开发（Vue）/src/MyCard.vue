<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <div class="my-card">
    <header v-if="title" class="my-card__header">{{ title }}</header>
    <div class="my-card__body"><slot /></div>
  </div>
</template>

<style scoped>
.my-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
}
.my-card__header {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
}
.my-card__body {
  padding: 16px;
}
</style>
