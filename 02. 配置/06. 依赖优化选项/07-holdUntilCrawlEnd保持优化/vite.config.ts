// optimizeDeps.holdUntilCrawlEnd：冷启动时保持优化结果
//
// 类型：boolean
// 默认：true
// 实验性功能
//
// 当该功能启用时（默认），系统会在冷启动时保持第一个优化的依赖结果，
// 直到所有的静态导入都被检索完毕。
//   - 避免：发现新依赖 → 触发新的公共 chunk 生成 → 需要刷新整个页面
//   - 代价：浏览器在等待期间无法并行处理更多请求
//
// 如果通过扫描和在 include 中明确定义的方式能找到所有的依赖项，
// 那么最好关闭这个功能，这样浏览器可以并行处理更多的请求

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    // ========== holdUntilCrawlEnd 配置 ==========

    // 默认：true — 冷启动时保持优化结果直到所有静态导入检索完毕
    // holdUntilCrawlEnd: true,

    // 关闭：如果所有依赖都已知（通过扫描或 include 明确指定），
    // 关闭此功能可以让浏览器并行处理更多请求
    holdUntilCrawlEnd: false,

    // ========== 实际场景示例 ==========

    // 场景一：依赖项都能通过扫描发现（默认行为）
    // holdUntilCrawlEnd: true,
    // Vite 会等待所有静态导入检索完毕，避免页面刷新

    // 场景二：依赖项已通过 include 明确指定
    // 当你在 include 中列出了所有需要的依赖时，关闭此功能
    // include: [
    //   'react',
    //   'react-dom',
    //   'axios',
    //   'lodash',
    // ],
    // holdUntilCrawlEnd: false,  // 已知所有依赖，无需等待

    // 场景三：大型项目优化冷启动
    // 如果项目依赖很多且有些是动态导入的，保持启用
    // holdUntilCrawlEnd: true,
    // 这可以避免因发现新依赖而触发页面刷新
  },
})
