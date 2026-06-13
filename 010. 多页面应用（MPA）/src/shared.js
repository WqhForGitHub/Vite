// 共享模块：会被三个入口共用，最终被 Rollup 抽离为公共 chunk
export function shared() {
  return `共享模块加载于 ${new Date().toLocaleTimeString()}`
}
