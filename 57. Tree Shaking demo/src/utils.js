// 工具库导出多个函数，但只有被使用的会被打包
export function used() {
  return 'used 函数被使用了'
}

export function unused() {
  return 'unused 函数应被 tree-shake 掉'
}

export function alsoUnused() {
  return 'alsoUnused 也会被移除'
}

export const CONST_USED = 'used const'
export const CONST_UNUSED = 'unused const'
