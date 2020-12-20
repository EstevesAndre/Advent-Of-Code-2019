const { read, send, test } = require('../utils')

const prepareInput = (rawInput) => {
  const [a, b] = rawInput.split('-').map(Number)

  return Array.from({ length: b - a + 1 }, (_, i) => String(a + i))
}

const isAscending = (str) => str.match(/^0*1*2*3*4*5*6*7*8*9*$/)

const goA = (input) => {
  return input.filter((pass) => pass.match(/(.)\1/) && isAscending(pass)).length
}

const goB = (input) => {
  return input.filter(
    (pass) =>
      (pass.match(/(.)\1+/g) || []).some((p) => p.length === 2) &&
      isAscending(pass),
  ).length
}

/* Tests */
test(goA(['111111']), 1)
test(goA(['223450']), 0)
test(goA(['123789']), 0)
test(goA(['122345', '111123', '135679']), 2)

test(goB(['112233']), 1)
test(goB(['123444']), 0)
test(goB(['111122']), 1)
test(goB(['112233', '123444', '111122']), 2)

/* Results */
const input = read()

console.time('Time')
const resultA = goA(prepareInput(input))
console.timeEnd('Time')
console.log('Solution to part 1:', resultA)

console.time('Time')
const resultB = goB(prepareInput(input))
console.timeEnd('Time')
console.log('Solution to part 2:', resultB)
