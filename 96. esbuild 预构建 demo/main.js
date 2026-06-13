import { sum, debounce } from 'lodash-es'
import dayjs from 'dayjs'

const lines = [
  `lodash-es sum([1,2,3,4]) = ${sum([1, 2, 3, 4])}`,
  `dayjs() = ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
  `debounce typeof = ${typeof debounce}`,
  '',
  '这两个包都被 esbuild 预构建合并为单个 ESM 文件。',
  '查看 Network: 只发了一个请求加载 lodash-es / dayjs。',
]

document.getElementById('out').textContent = lines.join('\n')
