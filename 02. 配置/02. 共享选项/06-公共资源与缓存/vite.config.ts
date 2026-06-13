// publicDir、cacheDir、assetsInclude：公共资源与缓存配置
//
// publicDir：作为静态资源服务的文件夹
//   - 默认："public"
//   - 开发期间在 / 处提供，构建时复制到 outDir 根目录
//   - 文件始终按原样提供/复制，不进行转换
//   - 设为 false 关闭此功能
//
// cacheDir：存储缓存文件的目录
//   - 默认："node_modules/.vite"
//   - 存储预打包的依赖项和 vite 生成的缓存文件
//   - 使用 --force 或手动删除可重新生成
//   - 没有 package.json 时默认为 .vite
//
// assetsInclude：指定额外的 picomatch 模式作为静态资源处理
//   - 从 HTML 引用或 fetch/XHR 请求时排除在插件管道外
//   - 从 JS 导入时返回解析后的 URL 字符串
import { defineConfig } from "vite";

export default defineConfig({
  // ========== publicDir ==========
  // 指定静态资源目录（可以是绝对路径或相对于项目根目录的相对路径）
  // 该目录中的文件在开发时通过 / 访问，构建时原样复制到输出目录
  // publicDir: 'public',              // 默认
  // publicDir: 'static',              // 自定义目录名
  // publicDir: path.resolve(__dirname, 'assets/public'),  // 绝对路径
  publicDir: false, // 禁用公共目录

  // ========== cacheDir ==========
  // 指定缓存文件目录（可以是绝对路径或相对于项目根目录的相对路径）
  // 预打包的依赖和 Vite 生成的缓存文件存放在此
  // cacheDir: 'node_modules/.vite',   // 默认
  // cacheDir: '.cache/vite',          // 自定义缓存路径

  // ========== assetsInclude ==========
  // 指定额外的文件类型作为静态资源处理
  // 内建支持的资源类型：https://vite.dev/guide/assets.html#static-assets
  assetsInclude: [
    "**/*.gltf", // 3D 模型文件
    "**/*.glb", // 3D 二进制模型文件
    "**/*.pdf", // PDF 文件
  ],

  // 也可以使用字符串（单个模式）
  // assetsInclude: '**/*.gltf',
});
