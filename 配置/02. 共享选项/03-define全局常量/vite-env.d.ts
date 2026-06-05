/// <reference types="vite/client" />

// define 定义的全局常量类型声明
// 在 vite.config.ts 中通过 define 选项定义的常量
// 需要在此文件中声明类型以获得 TypeScript 类型检查和代码提示

declare const __APP_VERSION__: string
declare const __MAX_ITEMS__: number
declare const __ENABLE_FEATURE_X__: boolean
declare const __API_URL__: string
declare const __APP_CONFIG__: {
  apiBase: string
  timeout: number
}
