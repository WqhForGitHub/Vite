/**
 * 库入口：vite-plugin-dts 会扫描 src 下的 .ts 文件，
 * 在 dist/types 中生成对应的 .d.ts 声明文件。
 */
export interface User {
  id: number
  name: string
  email?: string
}

export function greet(user: User): string {
  return `Hello, ${user.name}!`
}

export function add(a: number, b: number): number {
  return a + b
}

export const VERSION = '1.0.0'
