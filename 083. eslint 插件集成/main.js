// 故意触发 lint 规则
var x = 1 // 触发 no-var
var y = 2 // 触发 no-var
console.log('x + y =', x + y) // 触发 no-console-log

document.body.appendChild(
  Object.assign(document.createElement('p'), { textContent: 'x + y = ' + (x + y) }),
)
