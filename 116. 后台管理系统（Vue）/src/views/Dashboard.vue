<template>
  <div class="page">
    <h2>仪表盘</h2>
    <div class="cards" style="margin-top: 20px">
      <div class="card" v-for="s in stats" :key="s.title">
        <h3>{{ s.title }}</h3>
        <p>{{ s.value }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const stats = [
  { title: '总用户', value: 1024 },
  { title: '今日访问', value: 256 },
  { title: '订单数', value: 89 },
  { title: '收入', value: '¥12,580' },
]
</script>
