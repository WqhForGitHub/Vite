import { defineConfig } from 'vite'

// Vite 内置支持 ?init 形式的 WASM 加载，无需额外插件
// 这里仅做标准配置示范
export default defineConfig({
  // assetsInclude 让自定义后缀也能识别为资源
  assetsInclude: ['**/*.wasm'],
})
