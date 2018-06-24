import { opposite, clockwise } from './directions.js'
import co, { translate, areEqual } from './coordinates.js'
import createCoordinateMap from './coordinateMap.js'
import { WIDTH_BLOCKS, HEIGHT_BLOCKS } from './constants.js'
import createWall from './wall.js'

export default function createSnake () {
  let dead = false
  const leftWall = createWall(co(2, 1), 'd')
  const rightWall = createWall(co(1, 1), 'd')
  const history = []
  let headCoordinates = co(1, 1)

  let lastDirection = 'd'
  const occupied = createCoordinateMap(WIDTH_BLOCKS, HEIGHT_BLOCKS)
  occupied.set(co(1, 1), true)

  move('down', { extend: true })
  move('down', { extend: true })
  move('down', { extend: true })

  function move (direction, { food, extend } = {}) {
    direction = direction[0]
    if (dead || opposite(direction) === lastDirection) {
      return getState()
    }
    const nextPosition = translate[direction](headCoordinates)
    if (occupied.check(nextPosition)) {
      dead = true
      return getState()
    }
    if (direction === lastDirection) {
      leftWall.addFront(direction)
      rightWall.addFront(direction)
      history.push({ walls: ['l', 'r'], coordinates: headCoordinates })
    } else {
      const isClockwise = clockwise(lastDirection) === direction
      const inner = isClockwise ? rightWall : leftWall
      const outer = isClockwise ? leftWall : rightWall

      inner.rotateFront(isClockwise)
      outer.addFront(direction)
      outer.addFront(direction)
      history.push({
        walls: isClockwise ? ['l', 'l'] : ['r', 'r'],
        coordinates: headCoordinates
      })
    }
    lastDirection = direction
    headCoordinates = nextPosition
    occupied.set(nextPosition, true)

    const foundFood = areEqual(food, nextPosition)

    if (!(extend || foundFood)) {
      const { walls, coordinates } = history.shift()
      walls.forEach(wall => {
        if (wall === 'l') {
          leftWall.removeBack()
        } else {
          rightWall.removeBack()
        }
      })
      occupied.set(coordinates, false)
    }

    return {
      ateFood: foundFood,
      ...getState()
    }
  }

  function getState () {
    return {
      occupied,
      dead,
      coordinates: [
        ...leftWall.getCoordinates(),
        ...rightWall.getCoordinatesReverse()
      ]
    }
  }

  return { move, getState }
}
