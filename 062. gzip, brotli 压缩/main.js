// 写一些重复且占体积的内容，便于观察压缩效果
const longText = 'Vite is a next generation frontend tooling. '.repeat(500)

document.getElementById('app').innerHTML = `
  <h2>压缩前内容长度: ${longText.length}</h2>
  <p>构建后将生成 .gz 与 .br 文件，体积明显小于原文件。</p>
  <pre style="white-space:pre-wrap;max-height:200px;overflow:auto;background:#eee;padding:10px;">${longText}</pre>
`
