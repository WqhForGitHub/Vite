// 模拟稍后访问被预解析的域名
const links = [
  ...document.head.querySelectorAll('link[rel="dns-prefetch"], link[rel="preconnect"]'),
]
document.getElementById('out').textContent = [
  '已注入的预解析域名：',
  ...links.map((l) => `  ${l.rel} -> ${l.href}`),
].join('\n')
