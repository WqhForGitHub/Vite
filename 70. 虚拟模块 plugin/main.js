import appInfo, { appName, features } from 'virtual:app-info'

console.log({ appName, features, appInfo })
document.querySelector('#out').textContent = JSON.stringify(appInfo, null, 2)
