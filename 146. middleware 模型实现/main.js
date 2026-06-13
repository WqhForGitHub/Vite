const out = document.getElementById('out')

document.querySelectorAll('button[data-url]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const url = btn.dataset.url
    out.textContent = `requesting ${url} ...`
    try {
      const res = await fetch(url)
      const text = await res.text()
      out.textContent = `[${res.status}] ${url}\n\n${text}`
    } catch (e) {
      out.textContent = String(e)
    }
  })
})
