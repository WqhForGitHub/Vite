import config from '@config'
import fakeUser from 'fake:user'

const out = { config, fakeUser }
console.log(out)
document.querySelector('#out').textContent = JSON.stringify(out, null, 2)
