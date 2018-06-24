import { resolveCoordinates, parseCommand } from './commandPath.js'
import { opposite, clockwise } from './directions.js'
import co, { translate, areEqual } from './coordinates.js'
import createCoordinateMap from './coordinateMap.js'
import { WIDTH_BLOCKS, HEIGHT_BLOCKS } from './constants.js'
import createWall from './wall.js'

export default function createSnake (config) {
  let dead = false
  let anchor = { x: 2, y: 1 }
  const leftWall = createWall('d1')
  const frontWall = createWall('l1')
  const rightWall = createWall('d1')
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
    const { x, y } = nextPosition
    if (
      occupied.check(nextPosition) ||
      x < 0 ||
      y < 0 ||
      x >= WIDTH_BLOCKS ||
      y >= HEIGHT_BLOCKS
    ) {
      dead = true
      return getState()
    }
    if (direction === lastDirection) {
      leftWall.extendFront()
      rightWall.extendFront()
      history.push({ walls: 'lr', coordinates: headCoordinates })
    } else {
      const isClockwise = clockwise(lastDirection) === direction
      const inner = isClockwise ? rightWall : leftWall
      const outer = isClockwise ? leftWall : rightWall

      inner.rotateFront(isClockwise)
      outer.addFront(direction)
      outer.addFront(direction)
      frontWall.rotateFront(isClockwise)
      history.push({
        walls: isClockwise ? 'll' : 'rr',
        coordinates: headCoordinates
      })
    }
    lastDirection = direction
    headCoordinates = nextPosition
    occupied.set(nextPosition, true)

    const foundFood = areEqual(food, nextPosition)

    if (!(extend || foundFood)) {
      const { walls, coordinates } = history.shift()
      walls.split('').forEach(wall => {
        if (wall === 'l') {
          const { direction } = parseCommand(leftWall.get()[0])
          anchor = resolveCoordinates(anchor, `${direction}1`)[1]
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
      anchor,
      path: [...leftWall.get(), ...frontWall.get(), ...rightWall.getReverse()],
      occupied,
      dead
    }
  }

  return { move, getState }
}
