import doc from './queries.graphql'

document.querySelector('#src').textContent = doc.source
document.querySelector('#ops').textContent = JSON.stringify(doc.operations, null, 2)
console.log(doc)
