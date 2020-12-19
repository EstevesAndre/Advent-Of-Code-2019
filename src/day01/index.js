const { addListener } = require('process')
const { read, send, test } = require('../utils')

const prepareInput = (rawInput) =>
  rawInput.split('\n').map((mass) => Number(mass))

const goA = (rawInput) => {
  const input = prepareInput(rawInput)

  return input.map((mass) => Math.floor(mass / 3) - 2).reduce((a, b) => a + b)
}

const goB = (rawInput) => {
  const input = prepareInput(rawInput)

  return input
    .map((mass) => {
      var fuel = 0
      var div = mass
      do {
        div = Math.floor(div / 3) - 2
        fuel += div > 0 ? div : 0
      } while (div >= 0)
      return fuel
    })
    .reduce((a, b) => a + b)
}

/* Tests */
test(goA(`12`), 2)
test(goA(`14`), 2)
test(goA(`1969`), 654)
test(goA(`100756`), 33583)

test(goB(`14`), 2)
test(goB(`1969`), 966)
test(goB(`100756`), 50346)

/* Results */
const input = read()

console.time('Time')
const resultA = goA(input)
console.timeEnd('Time')
console.log('Solution to part 1:', resultA)

console.time('Time')
const resultB = goB(input)
console.timeEnd('Time')
console.log('Solution to part 2:', resultB)
