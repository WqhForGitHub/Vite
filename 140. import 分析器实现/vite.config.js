import { defineConfig } from 'vite'

// 自定义插件：模拟 vite 的 importAnalysisPlugin
const importAnalysisDemoPlugin = () => ({
  name: 'import-analysis-demo',
  transform(code, id) {
    if (!id.endsWith('sample.js')) return null
    // 仅打日志，不修改代码
    const re = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g
    let m
    const found = []
    while ((m = re.exec(code))) found.push(m[1])
    console.log('[import-analysis-demo] sample.js imports:', found)
    return null
  },
})

export default defineConfig({
  server: { port: 5140, open: true },
  plugins: [importAnalysisDemoPlugin()],
})
