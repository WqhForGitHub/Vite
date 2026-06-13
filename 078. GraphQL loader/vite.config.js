import { defineConfig } from 'vite'
import fs from 'node:fs'

// GraphQL loader: 把 .graphql / .gql 文件当作字符串导入，并解析出 operation 名称
function graphqlLoader() {
  return {
    name: 'graphql-loader',
    enforce: 'pre',
    load(id) {
      const filepath = id.split('?')[0]
      if (!/\.(graphql|gql)$/.test(filepath)) return null
      const src = fs.readFileSync(filepath, 'utf-8')

      // 简单解析 query/mutation 名称
      const ops = []
      const re = /\b(query|mutation|subscription)\s+(\w+)/g
      let m
      while ((m = re.exec(src))) {
        ops.push({ kind: m[1], name: m[2] })
      }

      return `
const source = ${JSON.stringify(src)}
const operations = ${JSON.stringify(ops)}
export default { source, operations }
export { source, operations }
`
    },
  }
}

export default defineConfig({
  plugins: [graphqlLoader()],
})
