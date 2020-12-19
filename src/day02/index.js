const { read, send, test } = require('../utils')

const prepareInput = (rawInput) => rawInput.trim().split(',').map(Number)

const goA = (rawInput, at1, at2) => {
  var input = prepareInput(rawInput)

  input[1] = at1 !== undefined ? at1 : input[1]
  input[2] = at2 !== undefined ? at2 : input[2]

  var i = 0
  while (input[i] != 99) {
    input[input[i + 3]] =
      input[i] === 1
        ? input[input[i + 1]] + input[input[i + 2]]
        : input[input[i + 1]] * input[input[i + 2]]

    i += 4
  }

  return input.slice(0, 3)
}

const goB = (rawInput, target) => {
  for (var noun = 0; noun < 100; noun++) {
    for (var verb = 0; verb < 100; verb++) {
      const part1 = goA(rawInput, noun, verb)

      if (part1[0] === target) return part1[1] * 100 + part1[2]
    }
  }

  return 0
}

/* Tests */
test(goA(`1,0,0,0,99`)[0], 2)
test(goA(`2,3,0,3,99`)[0], 2)
test(goA(`2,4,4,5,99,0`)[0], 2)
test(goA(`1,1,1,4,99,5,6,0,99`)[0], 30)
test(goA(`1,9,10,3,2,3,11,0,99,30,40,50`)[0], 3500)

test(goB(`1,0,0,0,99`, 2), 0)
test(goB(`1,9,10,3,2,3,11,0,99,30,40,50`, 3500), 910)

/* Results */
const input = read()

console.time('Time')
const resultA = goA(input, 12, 2)[0]
console.timeEnd('Time')
console.log('Solution to part 1:', resultA)

console.time('Time')
const resultB = goB(input, 19690720)
console.timeEnd('Time')
console.log('Solution to part 2:', resultB)
