import { info } from 'virtual:plugin-info'

console.log('virtual:plugin-info =', info)
document.getElementById('info').textContent = JSON.stringify(info, null, 2)
