import { VIRTUAL } from 'virtual:hello'

document.getElementById('out').textContent = [
  `__FROM_PLUGIN__ = ${__FROM_PLUGIN__}`,
  `virtual:hello = ${VIRTUAL}`,
].join('\n')
