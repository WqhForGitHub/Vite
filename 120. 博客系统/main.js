const posts = [
  {
    id: 1,
    title: 'Vite 为什么这么快？',
    date: '2025-06-01',
    tag: 'Vite',
    summary: '基于 ES Modules 与 esbuild，按需编译，启动飞快...',
    content:
      'Vite 利用浏览器原生 ES Modules，在开发阶段无需打包；构建阶段使用 Rollup，兼顾速度与产物质量。',
  },
  {
    id: 2,
    title: '前端工程化最佳实践',
    date: '2025-05-20',
    tag: '工程化',
    summary: '一份现代化的前端工程化清单...',
    content: '工程化包括代码规范、构建工具、CI/CD、自动化测试、组件库与设计系统等多个方面。',
  },
  {
    id: 3,
    title: 'TypeScript 进阶技巧',
    date: '2025-05-10',
    tag: '前端',
    summary: '一些日常开发中常用的 TS 类型体操技巧...',
    content: '联合类型、交叉类型、条件类型、映射类型，配合泛型可以写出非常优雅的类型定义。',
  },
  {
    id: 4,
    title: 'CSS 现代布局指南',
    date: '2025-04-25',
    tag: '前端',
    summary: 'Flex 与 Grid 的对比与场景选择...',
    content: 'Flex 适合一维布局，Grid 适合二维布局，组合使用可以应对绝大多数页面布局场景。',
  },
]

const list = document.getElementById('posts')
list.innerHTML = posts
  .map(
    (p) => `
  <article class="post" data-id="${p.id}">
    <h2>${p.title}</h2>
    <div class="meta">${p.date} <span class="tag">${p.tag}</span></div>
    <p>${p.summary}</p>
  </article>
`,
  )
  .join('')

const modal = document.getElementById('modal')
const article = document.getElementById('article')
list.addEventListener('click', (e) => {
  const card = e.target.closest('.post')
  if (!card) return
  const p = posts.find((x) => x.id === +card.dataset.id)
  article.innerHTML = `<h1>${p.title}</h1><div style="color:#999;margin-bottom:14px">${p.date}</div><p>${p.content}</p>`
  modal.style.display = 'flex'
})
document.getElementById('close').onclick = () => (modal.style.display = 'none')
