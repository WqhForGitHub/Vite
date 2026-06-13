import { defineConfig } from 'vite'

// 演示插件 enforce ('pre' | 'post') 与数组顺序对结果的影响
function makeReplacePlugin(name, from, to, enforce) {
  return {
    name,
    enforce, // 'pre' | undefined(normal) | 'post'
    transform(code, id) {
      if (!id.endsWith('main.js')) return
      if (code.includes(from)) {
        console.log(`[${name}] 替换 ${from} -> ${to}`)
        return code.replaceAll(from, to)
      }
    },
  }
}

// 顺序：所有 enforce:'pre' 插件 → vite 核心插件 → normal 插件 → enforce:'post' 插件
// 在同一组内按数组顺序执行
export default defineConfig({
  plugins: [
    makeReplacePlugin('plugin-A-normal', '__MSG__', 'A'), // 第二个执行（normal）
    makeReplacePlugin('plugin-B-pre', '__MSG__', 'B', 'pre'), // 最先执行（pre）
    makeReplacePlugin('plugin-C-post', 'A', 'C', 'post'), // 最后执行（post）
  ],

  server: {
    port: 5193,
    open: true,
  },
})

/*
 预期：
 1) pre B：__MSG__ -> B
 2) normal A：B 中已无 __MSG__，跳过
 3) post C：B -> 不匹配 'A'，跳过
 最终输出 'B'

 如果调换：把 plugin-A-normal 放到 enforce:'pre' 前面也无效，
 因为执行顺序由 enforce 决定，而非数组位置（同 enforce 才看数组顺序）。
*/
