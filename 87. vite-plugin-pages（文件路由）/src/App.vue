<template>
  <h1>vite-plugin-pages 文件路由 demo</h1>
  <nav>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/users/1">User 1</router-link>
  </nav>
  <hr />
  <router-view />
</template>
