// fs 文件安全：限制开发服务器提供的文件访问
//
// fs.strict：限制为工作区 root 路径以外的文件的访问
//   类型：boolean
//   默认：true（自 Vite 2.7 起默认启用）
//
// fs.allow：限制哪些文件可以通过 /@fs/ 路径提供服务
//   类型：string[]
//   当 server.fs.strict 为 true 时，访问目录列表外的文件将返回 403
//   Vite 会自动搜索工作区根目录，也支持手动指定
//
// fs.deny：限制 Vite 开发服务器提供敏感文件的黑名单
//   类型：string[]
//   默认：['.env', '.env.*', '*.{crt,pem}', '**/.git/**']
//   优先级高于 fs.allow，支持 picomatch 模式
//   注意：黑名单不适用于公共目录（public/）
import { defineConfig, searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  server: {
    fs: {
      // ========== strict 配置 ==========

      // 默认：true — 限制为工作区 root 路径以外的文件的访问
      strict: true,

      // ========== allow 配置 ==========

      // Vite 会自动搜索工作区根目录（包含 package.json workspaces、
      // lerna.json 或 pnpm-workspace.yaml 的目录）
      // 当 server.fs.allow 被设置时，自动检索将被禁用

      // 方式一：手动指定允许的目录
      // allow: [
      //   // 允许为项目根目录的上一级提供服务
      //   '..',
      // ],

      // 方式二：使用 searchForWorkspaceRoot 扩展默认行为
      allow: [
        // 搜索工作区的根目录
        searchForWorkspaceRoot(process.cwd()),
        // 自定义规则（替换为实际存在的路径）
        // '/path/to/custom/allow_directory',
        // '/path/to/custom/allow_file.demo',
      ],

      // ========== deny 配置 ==========

      // 默认黑名单：环境变量文件、证书文件、.git 目录
      // 优先级高于 fs.allow
      // 支持 picomatch 模式
      deny: [
        // 默认值
        '.env',
        '.env.*',
        '*.{crt,pem}',
        '**/.git/**',

        // 自定义拒绝规则：拒绝访问所有 .secret 文件
        '**/*.secret',

        // 拒绝访问特定目录
        '**/private/**',
      ],

      // ========== 注意事项 ==========
      //
      // 1. 黑名单不适用于公共目录（public/）
      //    公共目录中的所有文件均未经任何过滤，
      //    因为它们会在构建过程中直接复制到输出目录
      //
      // 2. 拒绝过滤器会同时作用于模块 id，
      //    以及移除查询参数后的 id
      //
      // 3. 由于插件可以在 load 钩子中读取任意文件
      //    （包括解析指向被拒绝路径的符号链接），
      //    Vite 无法保证被拒绝的文件不会通过其他路径访问到
      //    如果你存在其他可替代路径，也应将其一并加入拒绝列表
    },
  },
})
