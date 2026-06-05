// 异步配置：如果配置需要调用异步函数，可以导出一个异步函数
// 通过 defineConfig 传递以获得更好的智能提示
import { defineConfig } from 'vite'

// 模拟一个异步函数，例如从远程获取配置、读取文件等
async function getAsyncConfig() {
  return new Promise<{ port: number }>((resolve) => {
    setTimeout(() => {
      resolve({ port: 3000 })
    }, 100)
  })
}

export default defineConfig(async ({ command, mode }) => {
  const data = await getAsyncConfig()
  console.log('异步获取的配置数据:', data)

  return {
    server: {
      port: data.port,
    },
    // 其他 vite 配置...
  }
})
