export default {
  root: process.cwd(),
  base: '/',
  mode: "development",
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@@": resolve(__dirname, "src/common")
    },
    dedupe: [],
    conditions: [],
    mainFields: ["module", "jsnext:main", "jsnext"],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    preserveSymlinks: false
  },
  // 开发服务器选项
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    https: true,
    open: "",
    cors: true,
    proxy: {
      "/api/v1": {
        target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212",
        changeOrigin: tue
      }
    }
  },
  // 构建选项
  build: {
    target: "modules",
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {},
    lib: "",
    manifest: false,
    ssrManifest: false,
    ssr: undefined,
    minify: "esbuild",
    terserOptions: {},
    // 设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    emptyOutDir: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    watch: null
  },
  // 预览选项
  preview: {},
  // 插件数组
  plugins: [
  ]
}