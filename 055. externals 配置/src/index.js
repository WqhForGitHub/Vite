import { ref } from 'vue'
import { kebabCase } from 'lodash-es'

// 这些导入不会被打入产物（因为已被声明为 external）
export function useName(initial) {
  const name = ref(initial)
  return { name, kebab: () => kebabCase(name.value) }
}
