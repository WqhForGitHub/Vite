// host 与 port：控制开发服务器监听的 IP 地址和端口号
//
// host：指定服务器应该监听哪个 IP 地址
//   - 默认值：'localhost'（仅本地可访问）
//   - '0.0.0.0' 或 true：监听所有地址，包括局域网和公网地址
//   - 也可以通过 CLI 使用 --host 0.0.0.0 或 --host 来设置
//
// port：指定开发服务器端口
//   - 默认值：5173
//   - 注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口
//
// strictPort：设为 true 时若端口已被占用则会直接退出
//   - 默认值：false（端口占用时自动尝试下一个可用端口）
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // ========== host 配置 ==========

    // 默认：仅本地可访问
    // host: 'localhost',

    // 监听所有地址（局域网 + 公网），方便团队协作调试
    // 同事可通过你的局域网 IP 访问开发服务器
    host: '0.0.0.0',

    // 也可以使用 true，效果等同于 '0.0.0.0'
    // host: true,

    // ========== port 配置 ==========

    // 默认端口
    // port: 5173,

    // 自定义端口
    port: 3000,

    // ========== strictPort 配置 ==========

    // 默认：false — 端口被占用时自动尝试下一个可用端口
    // strictPort: false,

    // 设为 true — 端口被占用时直接退出，不会尝试其他端口
    // 适用于需要固定端口的场景（如 OAuth 回调地址已固定）
    strictPort: true,
  },
})
