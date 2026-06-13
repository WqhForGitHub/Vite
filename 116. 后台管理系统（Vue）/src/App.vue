<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>Admin</h2>
      <nav>
        <router-link to="/">仪表盘</router-link>
        <router-link to="/users">用户管理</router-link>
        <router-link to="/settings">系统设置</router-link>
      </nav>
    </aside>
    <main class="content">
      <header><span>欢迎，Admin</span></header>
      <router-view />
    </main>
  </div>
</template>
