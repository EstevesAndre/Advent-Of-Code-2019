const { read, send, test } = require('../utils')
const { pipe } = require('@arrows/composition')

const prepareInput = (rawInput) =>
  rawInput.split('\n').map((wire) =>
    wire.split(',').map((move) => ({
      dir: move.slice(0, 1),
      dis: Number(move.slice(1)),
    })),
  )

const getPaths = (input) => {
  return input.map((wire) => {
    var steps = 0
    var x = 0,
      y = 0
    var path = []

    for (const { dir, dis } of wire) {
      path = path.concat(
        Array.from({ length: dis }, () => [
          dir === 'R' ? ++x : dir === 'L' ? --x : x,
          dir === 'U' ? ++y : dir === 'D' ? --y : y,
          ++steps,
        ]),
      )
    }

    return path
  })
}

const findIntersections = (paths) => {
  const [a, b] = paths

  const bCords = new Map(b.map((x) => [`${x[0]}, ${x[1]}`, x[2]]))

  const intersections = []

  for (const x of a) {
    const bSteps = bCords.get(`${x[0]}, ${x[1]}`)

    if (bSteps !== undefined) intersections.push([...x, bSteps])
  }

  return intersections
}

const findNearestCross = (intersections) => {
  return Math.min(
    ...intersections.map((inter) => Math.abs(inter[0]) + Math.abs(inter[1])),
  )
}

const findLowestIntersectionSteps = (intersections) => {
  return Math.min(...intersections.map((inter) => inter[2] + inter[3]))
}

const goA = (rawInput) => {
  return pipe.now(
    prepareInput(rawInput),
    getPaths,
    findIntersections,
    findNearestCross,
  )
}

const goB = (rawInput) => {
  return pipe.now(
    prepareInput(rawInput),
    getPaths,
    findIntersections,
    findLowestIntersectionSteps,
  )
}

const input = read()

/* Tests */
pipe.now(
  prepareInput('R8,U5,L5,D3\nU7,R6,D4,L4'),
  getPaths,
  findIntersections,
  findNearestCross,
  test(6),
)
pipe.now(
  prepareInput(
    'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83',
  ),
  getPaths,
  findIntersections,
  findNearestCross,
  test(159),
)
pipe.now(
  prepareInput(
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
  ),
  getPaths,
  findIntersections,
  findNearestCross,
  test(135),
)

pipe.now(
  prepareInput('R8,U5,L5,D3\nU7,R6,D4,L4'),
  getPaths,
  findIntersections,
  findLowestIntersectionSteps,
  test(30),
)
pipe.now(
  prepareInput(
    'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83',
  ),
  getPaths,
  findIntersections,
  findLowestIntersectionSteps,
  test(610),
)
pipe.now(
  prepareInput(
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
  ),
  getPaths,
  findIntersections,
  findLowestIntersectionSteps,
  test(410),
)

/* Results */
console.time('Time')
const resultA = goA(input)
console.timeEnd('Time')
console.log('Solution to part 1:', resultA)

console.time('Time')
const resultB = goB(input)
console.timeEnd('Time')
console.log('Solution to part 2:', resultB)
