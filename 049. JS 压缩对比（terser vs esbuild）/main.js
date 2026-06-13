// 编写一些可被压缩的代码
function calculateSum(numbersArray) {
  let totalSum = 0
  for (let i = 0; i < numbersArray.length; i++) {
    totalSum = totalSum + numbersArray[i]
  }
  return totalSum
}

function calculateAverage(numbersArray) {
  const sumResult = calculateSum(numbersArray)
  const arrayLength = numbersArray.length
  return sumResult / arrayLength
}

const dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('debug only')

document.getElementById('info').textContent =
  `sum=${calculateSum(dataArray)}, avg=${calculateAverage(dataArray)}`
