const { read, send, test } = require('../utils')

const prepareInput = (rawInput) => rawInput.split(',').map(Number)

const jumps = {
  ADD: 4,
  MULTIPLY: 4,
  INPUT: 2,
  OUTPUT: 2,
  JUMP_IF_TRUE: 3,
  JUMP_IF_FALSE: 3,
  LESS_THAN: 4,
  EQUALS: 4,
}

const ops = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  HALT: 99,
}

const modes = {
  POSITION: 0,
  IMMEDIATE: 1,
}

const getValue = (input, params, pointer, index) => {
  return input[
    params[index] === modes.POSITION
      ? input[pointer + index + 1]
      : pointer + index + 1
  ]
}

const go = (rawInput, inp) => {
  const input = prepareInput(rawInput)

  const outputs = []
  let pointer = 0

  while (true) {
    const first = String(input[pointer]).padStart(5, '0')

    const opcode = Number(first.substr(3))

    if (opcode === ops.HALT) break

    const params = first.substr(0, 3).split('').reverse().map(Number)

    const a = getValue(input, params, pointer, 0)
    const b = getValue(input, params, pointer, 1)

    let shouldJump = true

    switch (opcode) {
      case ops.ADD:
        input[input[pointer + 3]] = a + b
        break
      case ops.MULTIPLY:
        input[input[pointer + 3]] = a * b
        break
      case ops.INPUT:
        input[input[pointer + 1]] = inp.shift()
        break
      case ops.OUTPUT:
        outputs.push(a)
        break
      case ops.JUMP_IF_TRUE:
        pointer = a !== 0 ? b : pointer
        shouldJump = a === 0
        break
      case ops.JUMP_IF_FALSE:
        pointer = a === 0 ? b : pointer
        shouldJump = a !== 0
        break
      case ops.LESS_THAN:
        input[input[pointer + 3]] = a < b ? 1 : 0
        break
      case ops.EQUALS:
        input[input[pointer + 3]] = a === b ? 1 : 0
        break
    }

    if (shouldJump)
      pointer += jumps[Object.keys(ops).find((k) => ops[k] === opcode)]
  }

  return outputs.pop()
}

const goB = (rawInput) => {
  const input = prepareInput(rawInput)

  return
}

/* Tests */

// test(goA(`rawInput`), expected)
// test(goB(`rawInput`), expected)

/* Results */
const input = read()

console.time('Time')
const resultA = go(input, [1])
console.timeEnd('Time')
console.log('Solution to part 1:', resultA)

console.time('Time')
const resultB = go(input, [5])
console.timeEnd('Time')
console.log('Solution to part 2:', resultB)
