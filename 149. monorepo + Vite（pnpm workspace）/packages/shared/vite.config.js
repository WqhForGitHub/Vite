import { defineConfig } from 'vite'
import path from 'node:path'

// shared 包：以「lib 模式」打包成可复用产物
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'DemoShared',
      fileName: 'shared',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
  },
})
