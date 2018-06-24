import _ from 'lodash'
import { opposite, clockwise } from './directions.js'
import co, { translate, areEqual } from './coordinates.js'
import createCoordinateMap from './coordinateMap.js'
import { WIDTH_IN_BLOCKS, HEIGHT_IN_BLOCKS } from './constants.js'
import createWall from './wall.js'

export default function createSnake () {
  let dead = false
  const leftWall = createWall(co(2, 1), 'd')
  const rightWall = createWall(co(1, 1), 'd')
  const history = [{ coordinates: co(1, 1) }]

  let lastDirection = 'd'
  const occupied = createCoordinateMap(WIDTH_IN_BLOCKS, HEIGHT_IN_BLOCKS)
  occupied.set(co(1, 1), true)

  move('down', { extend: true })
  move('down', { extend: true })
  move('down', { extend: true })

  function move (direction, { food, extend } = {}) {
    direction = direction[0]
    if (dead || opposite(direction) === lastDirection) {
      return getState()
    }
    const nextCoordinates = translate[direction](_.last(history).coordinates)
    if (occupied.check(nextCoordinates)) {
      dead = true
      return {
        died: true,
        ...getState()
      }
    }

    const foundFood = areEqual(food, nextCoordinates)
    // we need to remove the tail before adding to the head,
    // if not we could crash into the tail even though it
    // should be removed at the same time
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

    if (direction === lastDirection) {
      leftWall.addFront(direction)
      rightWall.addFront(direction)
      history[history.length - 1].walls = ['l', 'r']
    } else {
      const isClockwise = clockwise(lastDirection) === direction
      const inner = isClockwise ? rightWall : leftWall
      const outer = isClockwise ? leftWall : rightWall

      inner.rotateFront(isClockwise)
      outer.addFront(direction)
      outer.addFront(direction)
      history[history.length - 1].walls = isClockwise ? ['l', 'l'] : ['r', 'r']
    }
    history.push({ coordinates: nextCoordinates })
    lastDirection = direction
    occupied.set(nextCoordinates, true)

    return {
      ateFood: foundFood,
      ...getState()
    }
  }

  function getState () {
    return {
      occupied,
      coordinates: [
        ...leftWall.getCoordinates(),
        ...rightWall.getCoordinatesReverse()
      ]
    }
  }

  return { move, getState }
}
