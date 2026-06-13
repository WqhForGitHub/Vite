<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <h2>User Page</h2>
  <p>动态路由：<code>src/pages/users/[id].vue</code> => <code>/users/:id</code></p>
  <p>当前 id = {{ route.params.id }}</p>
</template>
