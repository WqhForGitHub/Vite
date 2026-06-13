// 实时聊天 demo：尝试连接 echo websocket 服务
// 若连接失败则回退到本地模拟模式
const messages = document.getElementById('messages')
const input = document.getElementById('input')
const sendBtn = document.getElementById('send')
const statusDot = document.getElementById('status-dot')
const statusText = document.getElementById('status-text')

let ws = null
let mockMode = false

function append(text, type = 'other') {
  const div = document.createElement('div')
  div.className = 'msg ' + type
  div.textContent = text
  messages.appendChild(div)
  messages.scrollTop = messages.scrollHeight
}

function setStatus(online, text) {
  statusDot.classList.toggle('online', online)
  statusText.textContent = text
}

function connect() {
  try {
    ws = new WebSocket('wss://echo.websocket.org')
    ws.onopen = () => {
      setStatus(true, '已连接 (echo 服务)')
      append('已连接到 echo.websocket.org，发送的消息会原样返回', 'system')
    }
    ws.onmessage = (e) => append(typeof e.data === 'string' ? e.data : '[二进制]', 'other')
    ws.onclose = () => {
      setStatus(false, '已断开')
      fallback()
    }
    ws.onerror = () => fallback()
  } catch (e) {
    fallback()
  }
}

function fallback() {
  if (mockMode) return
  mockMode = true
  setStatus(true, '本地模拟模式')
  append('（已切换为本地模拟模式：消息会有机器人回复）', 'system')
}

function send() {
  const text = input.value.trim()
  if (!text) return
  append(text, 'me')
  input.value = ''
  if (ws && ws.readyState === 1) {
    ws.send(text)
  } else if (mockMode) {
    setTimeout(() => {
      const replies = ['收到了 👍', '说得有道理', '哈哈哈', '我也这么觉得', '继续说说看？']
      append(replies[Math.floor(Math.random() * replies.length)], 'other')
    }, 600)
  }
}

sendBtn.onclick = send
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') send()
})

connect()
// 5s 仍未连接成功则回退
setTimeout(() => {
  if (!ws || ws.readyState !== 1) fallback()
}, 5000)
