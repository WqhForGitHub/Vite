// 模拟"重"的异步模块
export function heavy() {
  const data = Array.from({ length: 1000 }, (_, i) => i * i)
  return `lazy-loaded chunk: 数组长度 ${data.length}, 末位 = ${data.at(-1)}`
}
