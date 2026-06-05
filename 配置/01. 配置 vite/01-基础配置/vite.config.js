// 最基础的 Vite 配置文件
// 即使项目没有在 package.json 中开启 "type": "module"，
// Vite 也支持在配置文件中使用 ESM 语法
export default {
  // 配置选项
  root: '.', // 项目根目录
  server: {
    port: 5173, // 开发服务器端口
    open: false, // 是否自动打开浏览器
  },
}
