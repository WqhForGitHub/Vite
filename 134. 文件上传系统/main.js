/**
 * 文件上传系统核心逻辑
 * 功能：拖拽 / 多文件 / 进度 / 分片 / 秒传 / 暂停恢复
 */

const CHUNK_SIZE = 2 * 1024 * 1024 // 2MB 一片

const dropzone = document.getElementById('dropzone')
const fileInput = document.getElementById('file-input')
const btnSelect = document.getElementById('btn-select')
const btnUploadAll = document.getElementById('btn-upload-all')
const btnClear = document.getElementById('btn-clear')
const fileListEl = document.getElementById('file-list')

// 文件队列：{ id, file, hash, status, progress, controller, paused }
const fileQueue = new Map()
let queueIdSeed = 1

// ========== 工具函数 ==========
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

// 简单计算文件 hash（演示版本：基于名字 + 大小 + 修改时间）
async function calcFileHash(file) {
  const text = `${file.name}-${file.size}-${file.lastModified}`
  const buf = new TextEncoder().encode(text)
  const hashBuf = await crypto.subtle.digest('SHA-256', buf)
  return [...new Uint8Array(hashBuf)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16)
}

// ========== 渲染 ==========
function render() {
  if (fileQueue.size === 0) {
    fileListEl.innerHTML = '<div class="empty">尚未选择任何文件</div>'
    return
  }
  fileListEl.innerHTML = ''
  for (const item of fileQueue.values()) {
    const row = document.createElement('div')
    row.className = 'file-item'
    row.innerHTML = `
      <div class="file-meta">
        <div class="name" title="${item.file.name}">${item.file.name}</div>
        <div class="info">
          <span>${formatSize(item.file.size)}</span>
          <span class="status status-${item.status}">${statusText(item.status)}</span>
        </div>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar" style="width:${item.progress}%"></div>
        <span class="progress-text">${item.progress.toFixed(1)}%</span>
      </div>
      <div class="ops">
        ${item.status === 'uploading' ? `<button data-act="pause" data-id="${item.id}">暂停</button>` : ''}
        ${item.status === 'paused' ? `<button data-act="resume" data-id="${item.id}">继续</button>` : ''}
        ${item.status === 'pending' || item.status === 'error' ? `<button data-act="upload" data-id="${item.id}">上传</button>` : ''}
        <button data-act="remove" data-id="${item.id}">移除</button>
      </div>
    `
    fileListEl.appendChild(row)
  }
}

function statusText(s) {
  return (
    {
      pending: '待上传',
      hashing: '计算 hash',
      uploading: '上传中',
      paused: '已暂停',
      success: '上传成功',
      error: '失败',
      instant: '秒传完成',
    }[s] || s
  )
}

// ========== 文件加入队列 ==========
function addFiles(files) {
  for (const file of files) {
    const id = queueIdSeed++
    fileQueue.set(id, {
      id,
      file,
      hash: '',
      status: 'pending',
      progress: 0,
      uploadedChunks: new Set(),
      paused: false,
      abortControllers: [],
    })
  }
  render()
}

// ========== 上传逻辑 ==========
async function uploadFile(item) {
  try {
    item.status = 'hashing'
    render()
    item.hash = await calcFileHash(item.file)

    // 1. 秒传检查
    const checkRes = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash: item.hash, name: item.file.name }),
    }).then((r) => r.json())

    if (checkRes.exists) {
      item.status = 'instant'
      item.progress = 100
      render()
      return
    }
    if (Array.isArray(checkRes.uploadedChunks)) {
      checkRes.uploadedChunks.forEach((i) => item.uploadedChunks.add(i))
    }

    // 2. 分片上传
    const file = item.file
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
    item.status = 'uploading'
    item.paused = false
    render()

    for (let i = 0; i < totalChunks; i++) {
      if (item.paused) {
        item.status = 'paused'
        render()
        return
      }
      if (item.uploadedChunks.has(i)) continue

      const start = i * CHUNK_SIZE
      const end = Math.min(start + CHUNK_SIZE, file.size)
      const chunk = file.slice(start, end)

      const fd = new FormData()
      fd.append('file', chunk)
      fd.append('hash', item.hash)
      fd.append('index', String(i))
      fd.append('total', String(totalChunks))
      fd.append('name', file.name)

      const controller = new AbortController()
      item.abortControllers.push(controller)

      await fetch('/api/upload', { method: 'POST', body: fd, signal: controller.signal })

      item.uploadedChunks.add(i)
      item.progress = (item.uploadedChunks.size / totalChunks) * 100
      render()
    }

    // 3. 通知合并
    await fetch('/api/merge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash: item.hash, name: file.name, total: totalChunks }),
    })

    item.status = 'success'
    item.progress = 100
    render()
  } catch (err) {
    if (err.name === 'AbortError') {
      item.status = 'paused'
    } else {
      console.error(err)
      item.status = 'error'
    }
    render()
  }
}

function pauseFile(item) {
  item.paused = true
  item.abortControllers.forEach((c) => c.abort())
  item.abortControllers = []
}

// ========== 事件绑定 ==========
btnSelect.addEventListener('click', () => fileInput.click())
dropzone.addEventListener('click', () => fileInput.click())

fileInput.addEventListener('change', (e) => {
  addFiles(e.target.files)
  fileInput.value = ''
})

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault()
  dropzone.classList.add('dragging')
})
dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragging')
})
dropzone.addEventListener('drop', (e) => {
  e.preventDefault()
  dropzone.classList.remove('dragging')
  if (e.dataTransfer?.files) addFiles(e.dataTransfer.files)
})

btnUploadAll.addEventListener('click', () => {
  for (const item of fileQueue.values()) {
    if (item.status === 'pending' || item.status === 'error') {
      uploadFile(item)
    }
  }
})

btnClear.addEventListener('click', () => {
  for (const item of fileQueue.values()) {
    if (item.status === 'uploading') pauseFile(item)
  }
  fileQueue.clear()
  render()
})

fileListEl.addEventListener('click', (e) => {
  const target = e.target
  if (!(target instanceof HTMLElement)) return
  const act = target.dataset.act
  const id = Number(target.dataset.id)
  if (!act || !id) return
  const item = fileQueue.get(id)
  if (!item) return

  if (act === 'upload') uploadFile(item)
  else if (act === 'pause') pauseFile(item)
  else if (act === 'resume') uploadFile(item)
  else if (act === 'remove') {
    if (item.status === 'uploading') pauseFile(item)
    fileQueue.delete(id)
    render()
  }
})

render()
console.log('[文件上传系统] 初始化完成')
