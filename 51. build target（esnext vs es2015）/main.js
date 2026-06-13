// 使用一些较新的 ES 语法来观察 target 的差异

class Counter {
  #count = 0 // 私有字段（ES2022）
  inc() {
    this.#count++
    return this.#count
  }
}

const arr = [1, 2, 3]
const result = arr?.map?.((x) => x ** 2) ?? [] // 可选链 / 空值合并 / **

const counter = new Counter()
counter.inc()
counter.inc()

document.getElementById('out').textContent = JSON.stringify(
  {
    squared: result,
    count: counter.inc(),
  },
  null,
  2,
)
