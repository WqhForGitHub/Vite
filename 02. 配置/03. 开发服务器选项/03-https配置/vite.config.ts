// https：启用 TLS + HTTP/2
//
// 类型：https.ServerOptions
// 该值是传递给 https.createServer() 的 options 对象。
//
// 需要一个合法可用的证书。对基本使用的配置需求来说，你可以添加
// @vitejs/plugin-basic-ssl 到项目插件中，它会自动创建和缓存一个自签名的证书。
// 但我们推荐你创建和使用你自己的证书。
import { defineConfig } from "vite";
// import fs from 'node:fs'

export default defineConfig({
  server: {
    // ========== https 配置 ==========
    // 方式一：使用自定义证书文件（推荐）
    // 需要提供证书和私钥的路径
    // 使用前请确保证书文件存在，否则 Vite 启动时会报错
    // https: {
    //   key: fs.readFileSync('./cert/key.pem'),
    //   cert: fs.readFileSync('./cert/cert.pem'),
    // },
    // 方式二：使用 @vitejs/plugin-basic-ssl 插件自动生成自签名证书
    // 1. 安装：npm i -D @vitejs/plugin-basic-ssl
    // 2. 配置：
    // import basicSsl from '@vitejs/plugin-basic-ssl'
    //
    // export default defineConfig({
    //   plugins: [basicSsl()],
    //   server: {
    //     https: true,
    //   },
    // })
    // 方式三：仅传入 true 使用基本的 HTTPS（需要配合插件）
    // https: true,
    // 默认不启用 HTTPS（取消以上任一方式的注释即可启用）
  },
});
