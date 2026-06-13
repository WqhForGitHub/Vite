import rawSvg from './icon.svg?raw'
import iconComp from './icon.svg?component'

document.querySelector('#raw').textContent = rawSvg
iconComp.mount('#comp')
