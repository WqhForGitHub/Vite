import { sum } from 'lodash-es'
import dayjs from 'dayjs'
import { format } from '@/utils/format.js'

const out = document.getElementById('out')
out.textContent = [format('sum', sum([1, 2, 3, 4, 5])), format('time', dayjs().format())].join('\n')

document.getElementById('lazy').onclick = async () => {
  // 动态 import 触发代码分割
  const { heavy } = await import('./pages/heavy.js')
  out.textContent += '\n' + heavy()
}
