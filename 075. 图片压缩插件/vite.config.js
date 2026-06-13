import { defineConfig } from 'vite'

// 图片压缩插件（演示用）
// 真实的压缩需要 sharp / imagemin 等库；这里用一个最小可运行版本：
// - 在 generateBundle 阶段，对 .png/.jpg/.svg 资源进行"伪压缩"（裁掉多余空白等）
// - 演示插件结构和报告
function imageMinifyPlugin() {
  return {
    name: 'image-minify',
    apply: 'build', // 仅在构建时生效
    generateBundle(_, bundle) {
      let saved = 0
      let total = 0
      for (const fileName of Object.keys(bundle)) {
        const asset = bundle[fileName]
        if (asset.type !== 'asset') continue
        if (!/\.(png|jpe?g|gif|svg)$/i.test(fileName)) continue

        const before = asset.source.length || asset.source.byteLength || 0
        // 演示：对 SVG 做最小化（去注释和多余空白）
        if (fileName.endsWith('.svg') && typeof asset.source === 'string') {
          asset.source = asset.source
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim()
        }
        const after = asset.source.length || asset.source.byteLength || 0
        total += before
        saved += Math.max(0, before - after)
        console.log(`[image-minify] ${fileName}: ${before} -> ${after}`)
      }
      console.log(`[image-minify] 总计节省 ${saved}B / ${total}B`)
    },
  }
}

export default defineConfig({
  plugins: [imageMinifyPlugin()],
})
