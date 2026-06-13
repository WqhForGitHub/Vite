import { analyzeImports, rewriteBareImports } from './analyzer.js'
import './sample.js'

const $ = (id) => document.getElementById(id)

function classify(spec) {
  if (spec.startsWith('./') || spec.startsWith('../')) return 'relative'
  if (spec.startsWith('/')) return 'abs'
  return 'bare'
}

function render(list, target) {
  target.innerHTML =
    list
      .map((s) => `<span class="item ${classify(s)}">${s} <small>[${classify(s)}]</small></span>`)
      .join('') || '<i>无</i>'
}

function run() {
  const code = $('input').value
  const { staticImports, dynamicImports } = analyzeImports(code)
  render(staticImports, $('static'))
  render(dynamicImports, $('dynamic'))
}

$('run').addEventListener('click', run)
$('rewrite').addEventListener('click', () => {
  $('rewritten').textContent = rewriteBareImports($('input').value)
})

run()
