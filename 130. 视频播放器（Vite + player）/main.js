const video = document.getElementById('video')
const playBtn = document.getElementById('play')
const progress = document.getElementById('progress')
const time = document.getElementById('time')
const mute = document.getElementById('mute')
const volume = document.getElementById('volume')
const rate = document.getElementById('rate')
const fs = document.getElementById('fullscreen')
const list = document.getElementById('list')

const playlist = [
  { name: 'Big Buck Bunny', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { name: 'Sample Video', url: 'https://www.w3schools.com/html/movie.mp4' },
  { name: 'Demo Clip', url: 'https://www.w3schools.com/tags/movie.mp4' },
]
let active = 0

function renderList() {
  list.innerHTML = playlist
    .map(
      (v, i) => `<div class="item ${i === active ? 'active' : ''}" data-i="${i}">▶ ${v.name}</div>`,
    )
    .join('')
}
renderList()
list.addEventListener('click', (e) => {
  const it = e.target.closest('.item')
  if (!it) return
  active = +it.dataset.i
  video.src = playlist[active].url
  video.play()
  renderList()
})

playBtn.onclick = () => (video.paused ? video.play() : video.pause())
video.onplay = () => (playBtn.textContent = '⏸')
video.onpause = () => (playBtn.textContent = '▶')

function fmt(s) {
  if (isNaN(s)) return '0:00'
  const m = Math.floor(s / 60),
    x = Math.floor(s % 60)
  return `${m}:${x.toString().padStart(2, '0')}`
}
video.ontimeupdate = () => {
  if (video.duration) progress.value = (video.currentTime / video.duration) * 100
  time.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`
}
progress.oninput = () => {
  if (video.duration) video.currentTime = (progress.value / 100) * video.duration
}

mute.onclick = () => {
  video.muted = !video.muted
  mute.textContent = video.muted ? '🔇' : '🔊'
}
volume.oninput = (e) => (video.volume = e.target.value)
rate.onchange = (e) => (video.playbackRate = +e.target.value)
fs.onclick = () => video.requestFullscreen?.()
