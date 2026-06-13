<script setup>
// 方式一：直接 import 单个图标（按需加载）
import IconHome from '~icons/mdi/home'
import IconGitHub from '~icons/mdi/github'
</script>

<template>
  <h1>vite-plugin-icons (unplugin-icons) demo</h1>

  <h3>方式一：直接 import</h3>
  <p>
    <IconHome style="font-size: 32px; color: tomato" />
    <IconGitHub style="font-size: 32px" />
  </p>

  <h3>方式二：自动注册（前缀 i-）</h3>
  <p>
    <i-mdi-account style="font-size: 32px; color: cornflowerblue" />
    <i-mdi-rocket-launch style="font-size: 32px; color: orange" />
    <i-logos-vitejs style="font-size: 32px" />
  </p>
</template>
