<template>
  <div class="page">
    <h2>系统设置</h2>
    <div style="margin-top: 20px; background: #fff; padding: 20px; border-radius: 4px">
      <p>站点名称：<input v-model="name" /></p>
      <p style="margin-top: 10px">
        主题：
        <select v-model="theme">
          <option>亮色</option>
          <option>暗色</option>
        </select>
      </p>
      <button style="margin-top: 10px" @click="save">保存</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const name = ref('Vite Admin')
const theme = ref('亮色')
const save = () => alert('已保存：' + name.value + ' / ' + theme.value)
</script>
