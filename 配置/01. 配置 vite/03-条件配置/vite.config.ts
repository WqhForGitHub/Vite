// 条件配置：根据 command、mode、isSsrBuild、isPreview 决定配置
// command: 'serve'（开发环境）| 'build'（生产环境）
// mode: 默认 serve 为 'development'，build 为 'production'
// isSsrBuild: 是否为 SSR 构建
// isPreview: 是否为预览构建产物
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log("command:", command); // 'serve' | 'build'
  console.log("mode:", mode); // 'development' | 'production' | 自定义 mode
  console.log("isSsrBuild:", isSsrBuild); // boolean | undefined
  console.log("isPreview:", isPreview); // boolean | undefined

  if (command === "serve") {
    // 开发环境独有配置
    return {
      server: {
        port: 5173,
        open: true,
      },
      // 仅在开发环境启用的插件等
    };
  } else {
    // command === 'build'，生产环境独有配置
    return {
      build: {
        outDir: "dist",
        minify: "esbuild",
        rollupOptions: {
          output: {
            manualChunks(id) {
              // 示例：将 node_modules 中的 vue 单独打包为 vendor chunk
              if (id.includes("node_modules/vue")) {
                return "vendor";
              }
            },
          },
        },
      },
    };
  }
});
