<template>
  <div class="page">
    <h2>用户管理</h2>
    <table style="margin-top: 20px">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>邮箱</th>
          <th>角色</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
const users = [
  { id: 1, name: '张三', email: 'zhang@x.com', role: 'Admin' },
  { id: 2, name: '李四', email: 'li@x.com', role: 'User' },
  { id: 3, name: '王五', email: 'wang@x.com', role: 'Editor' },
]
</script>
