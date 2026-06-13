// RBAC 权限模型
const rolePermissions = {
  guest: ['post:read'],
  user: ['post:read', 'post:create'],
  editor: ['post:read', 'post:create', 'post:edit'],
  admin: ['post:read', 'post:create', 'post:edit', 'post:delete', 'user:manage'],
}

const menuMap = [
  { name: '首页', perm: null },
  { name: '文章列表', perm: 'post:read' },
  { name: '发布文章', perm: 'post:create' },
  { name: '编辑文章', perm: 'post:edit' },
  { name: '删除文章', perm: 'post:delete' },
  { name: '用户管理', perm: 'user:manage' },
]

const select = document.getElementById('role')
const menuEl = document.getElementById('menu')
const info = document.getElementById('info')

function hasPerm(role, p) {
  return !p || rolePermissions[role].includes(p)
}

function update() {
  const role = select.value
  const perms = rolePermissions[role]
  menuEl.innerHTML = menuMap
    .filter((m) => hasPerm(role, m.perm))
    .map((m) => `<li>${m.name}</li>`)
    .join('')
  document.querySelectorAll('.btn-group button').forEach((b) => {
    b.disabled = !hasPerm(role, b.dataset.perm)
  })
  info.innerHTML = `当前角色 <code>${role}</code> 拥有权限：<br>${perms.map((p) => `<code>${p}</code>`).join(' ')}`
}

select.addEventListener('change', update)
document.querySelectorAll('.btn-group button').forEach((b) => {
  b.onclick = () => alert('执行操作：' + b.dataset.perm)
})
update()
