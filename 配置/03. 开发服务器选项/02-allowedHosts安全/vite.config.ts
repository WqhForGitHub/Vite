// allowedHosts：Vite 允许响应的主机名
//
// 类型：string[] | true
// 默认值：[]
//
// 默认情况下，允许 localhost 及其下的所有 .localhost 域名和所有 IP 地址。
// 使用 HTTPS 时，将跳过此检查。
//
// 如果设置的字符串以 . 开头，则允许该主机名本身（不带 .）
// 以及该主机名下的所有子域名。例如：
//   '.example.com' 将允许 example.com、foo.example.com 和 foo.bar.example.com
//
// 危险：设置为 true 允许任何网站通过 DNS 重绑定攻击向你的开发服务器发送请求
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // ========== allowedHosts 配置 ==========

    // 默认：空数组，仅允许 localhost、.localhost 域名和 IP 地址
    // allowedHosts: [],

    // 允许指定主机名访问
    allowedHosts: [
      // 允许特定主机名
      'dev.myapp.com',

      // 以 . 开头表示允许该主机名及其所有子域名
      // '.example.com' 允许 example.com、foo.example.com、bar.example.com
      '.example.com',
    ],

    // ⚠️ 危险：允许任何主机请求（不推荐，存在 DNS 重绑定攻击风险）
    // allowedHosts: true,
  },
})
