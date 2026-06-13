// 注意：没有 import！ref / reactive / h / useState 由插件自动注入
const count = ref(0)
const state = reactive({ name: 'vite', items: [1, 2, 3] })
const vnode = h('div', { id: 'box' }, 'hello')
const [val, setVal] = useState(42)

const out = { count, state, vnode, val }
console.log(out)
document.querySelector('#out').textContent = JSON.stringify(out, null, 2)
