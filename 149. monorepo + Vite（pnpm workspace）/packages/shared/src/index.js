// shared 包：被 web 包通过 workspace 协议依赖
export function formatDate(d = new Date()) {
  return d.toISOString().replace('T', ' ').slice(0, 19)
}

export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

export const VERSION = '1.0.0'
