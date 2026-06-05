// worker.plugins
// 应用于 Worker 打包的 Vite 插件
//
// worker.plugins
//   类型：() => (Plugin | Plugin[])[]
//   应用于 worker 打包的 Vite 插件。
//   注意：config.plugins 仅会在开发（dev）阶段应用于 worker，
//   若要配置在构建（build）阶段应用于 worker 的插件则应该在本选项这里配置。
//   该函数应返回新的插件实例，因为它们在并行的 rolldown worker 构建中使用。
//   因此，在 config 钩子中修改 config.worker 选项将被忽略。

import { defineConfig, type Plugin } from 'vite'

// ========== 自定义 Worker 插件示例 ==========

// 一个简单的 Worker 专用日志插件
function workerLogPlugin(): Plugin {
  return {
    name: 'worker-log-plugin',
    buildStart() {
      console.log('[Worker] Worker 构建开始')
    },
    transform(code, id) {
      // 可以在 Worker 代码中注入逻辑或进行转换
      console.log('[Worker] 转换文件:', id)
      return null
    },
  }
}

// 一个 Worker 环境变量注入插件
function workerEnvPlugin(): Plugin {
  return {
    name: 'worker-env-plugin',
    transform(code, id) {
      // 在 Worker 代码中替换环境变量占位符
      if (code.includes('__WORKER_VERSION__')) {
        return code.replace(
          /__WORKER_VERSION__/g,
          JSON.stringify('1.0.0'),
        )
      }
      return null
    },
  }
}

export default defineConfig({
  worker: {
    // ========== plugins 配置 ==========

    // 注意：必须是一个函数，返回新的插件实例
    // 因为 Worker 构建是并行执行的，不能共享插件实例
    plugins: () => [
      workerLogPlugin(),
      workerEnvPlugin(),
    ],

    // ========== 常见写法 ==========

    // 写法一：返回单个插件数组
    // plugins: () => [workerLogPlugin()],

    // 写法二：返回多个插件数组的数组（自动展平）
    // plugins: () => [
    //   [workerLogPlugin()],
    //   [workerEnvPlugin()],
    // ],

    // 写法三：内联插件定义
    // plugins: () => [
    //   {
    //     name: 'inline-worker-plugin',
    //     transform(code, id) {
    //       return null
    //     },
    //   },
    // ],

    // ========== 注意事项 ==========

    // 1. 必须是函数形式，不能直接传数组：
    //    ❌ plugins: [workerLogPlugin()]  // 类型错误
    //    ✅ plugins: () => [workerLogPlugin()]  // 正确

    // 2. config.plugins 在开发阶段会自动应用于 Worker，
    //    但构建阶段不会。如果需要在构建阶段也应用插件到 Worker，
    //    必须使用 worker.plugins

    // 3. 在 config 钩子中修改 config.worker 选项会被忽略：
    //    ❌ 在插件 config() 钩子中修改 config.worker
    //    ✅ 直接在 vite.config.ts 中配置 worker.plugins

    // 4. 每次调用必须返回新的插件实例，因为 Worker 构建是并行的
  },
})
