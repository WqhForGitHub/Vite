import { capitalize } from 'lodash-es'

export function greet(name) {
  return `Hello, ${capitalize(name)}!`
}

export function reverse(str) {
  return str.split('').reverse().join('')
}
