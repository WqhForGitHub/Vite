// root 与 base：控制项目的根目录与公共基础路径
//
// root：项目根目录（index.html 所在位置）
//   - 默认值：process.cwd()（即运行 vite 命令时的目录）
//   - 可以是绝对路径，或相对于配置文件的相对路径
//
// base：开发或生产环境服务的公共基础路径
//   - 默认值：'/'
//   - 合法值：
//     1. 绝对 URL 路径名，例如 '/foo/'
//     2. 完整 URL，例如 'https://bar.com/foo/'（域名在开发环境不使用）
//     3. 空字符串 '' 或 './'（用于嵌入形式开发）
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  // 指定项目根目录为 src 目录
  // 这样 index.html 应该放在 src/ 下，而不是项目根目录
  // root: 'src',

  // 使用绝对路径指定根目录
  // root: path.resolve(__dirname, 'src'),

  // ========== base 配置 ==========

  // 默认：所有资源从根路径加载
  // base: '/',

  // 部署到子路径时，例如 GitHub Pages 项目站点
  // 如果仓库名为 my-project，则设置为 '/my-project/'
  // base: '/my-project/',

  // 使用相对路径，适用于不在根路径部署的情况
  // 构建后可从任意路径访问
  base: './',
})
