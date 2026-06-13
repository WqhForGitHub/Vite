// resolve 解析配置：tsconfigPaths、extensions、conditions、mainFields、dedupe、preserveSymlinks
//
// resolve.tsconfigPaths：启用 tsconfig.json 的 paths 解析
// resolve.extensions：导入时想要省略的扩展名列表
// resolve.conditions：解析 npm 包条件导出时额外允许的条件
// resolve.mainFields：解析包入口点时尝试的 package.json 字段
// resolve.dedupe：强制将列出的依赖解析为同一副本
// resolve.preserveSymlinks：通过原始文件路径确定文件身份
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    // ========== tsconfigPaths ==========
    // 启用后，tsconfig.json 中的 paths 选项将用于解析导入
    // 默认 false，启用后无需再手动配置 alias 来匹配 tsconfig paths
    tsconfigPaths: true,

    // ========== extensions ==========
    // 导入时想要省略的扩展名列表
    // 默认：['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    // 注意：不建议忽略自定义导入类型的扩展名（如 .vue），会影响 IDE 和类型支持
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],

    // ========== conditions ==========
    // 解析 npm 包条件导出时额外允许的条件
    // 默认：['module', 'browser', 'development|production']
    //
    // development|production 是特殊值，根据 process.env.NODE_ENV 替换
    // import、require、default 条件始终会被应用
    // 解析样式导入时会应用 style 条件
    // Sass 使用 sass 条件，Less 使用 less 条件
    conditions: ["module", "browser", "development|production"],

    // ========== mainFields ==========
    // 解析包入口点时尝试的 package.json 字段列表
    // 默认：['browser', 'module', 'jsnext:main', 'jsnext']
    // 注意：比 exports 字段解析的条件导出优先级低
    mainFields: ["browser", "module", "jsnext:main", "jsnext"],

    // ========== dedupe ==========
    // 在 monorepo 中，相同依赖可能有多个副本
    // 此选项强制 Vite 始终将列出的依赖解析为同一副本（从项目根目录）
    // 例如：多个子项目都依赖了 lodash，确保只使用一个副本
    dedupe: ["lodash", "react", "vue"],

    // ========== preserveSymlinks ==========
    // 启用后 Vite 通过原始文件路径（不跟随符号链接）确定文件身份
    // 默认 false（跟随符号链接后的真实路径）
    // 适用于使用 pnpm 或 npm link 的场景
    preserveSymlinks: false,
  },
});
