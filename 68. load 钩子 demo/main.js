import info from './data.info'

console.log('info =', info)
document.querySelector('#out').textContent = JSON.stringify(info, null, 2)
