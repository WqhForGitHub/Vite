// 使用 satisfies 运算符进行类型检查
// satisfies 是 TypeScript 4.9+ 的特性
// 与 defineConfig 不同，satisfies 只做类型检查，不会改变推断类型
import type { UserConfig } from "vite";

export default {
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
} satisfies UserConfig;
