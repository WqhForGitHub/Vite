// define：定义全局常量替换方式
//
// 每项在开发环境下会被定义在全局，而在构建时被静态替换
// Vite 使用 Oxc 的 define 功能进行替换
//
// 值要求：
//   - 必须是包含 JSON 可序列化值（null、boolean、number、string、array、object）的字符串
//   - 或单一标识符的字符串
//   - 非字符串值会自动使用 JSON.stringify 转换
//
// TypeScript 用户需在 vite-env.d.ts 中添加类型声明
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    // 字符串值需要用 JSON.stringify 包裹
    // 替换后：const __APP_VERSION__ = "v1.0.0"
    __APP_VERSION__: JSON.stringify("v1.0.0"),

    // 数字值也会被自动 JSON.stringify
    // 替换后：const __MAX_ITEMS__ = 100
    __MAX_ITEMS__: JSON.stringify(100),

    // 布尔值
    __ENABLE_FEATURE_X__: JSON.stringify(true),

    // 直接使用标识符（不加引号）
    // 替换后：const __API_URL__ = window.__backend_api_url
    // 这会将代码中的 __API_URL__ 替换为 window.__backend_api_url 的值
    __API_URL__: "window.__backend_api_url",

    // 对象值
    __APP_CONFIG__: JSON.stringify({
      apiBase: "/api",
      timeout: 5000,
    }),
  },
});

// ====================================================
// TypeScript 类型声明示例（需在 vite-env.d.ts 中添加）
// ====================================================
//
// // vite-env.d.ts
// declare const __APP_VERSION__: string
// declare const __MAX_ITEMS__: number
// declare const __ENABLE_FEATURE_X__: boolean
// declare const __API_URL__: string
// declare const __APP_CONFIG__: { apiBase: string; timeout: number }
//
// 这样在代码中使用这些常量时就能获得类型提示和检查
