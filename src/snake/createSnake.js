import _ from 'lodash'
import {
  resolveCoordinates,
  extendEnd,
  extendStart,
  addEnd,
  addStart,
  removeEnd,
  removeStart,
  rotateEnd,
  rotateStart
} from './commandPath.js'
import { opposite, clockwise } from './directions.js'
import co, { translate, areEqual } from './coordinates.js'
import createCoordinateMap from './coordinateMap.js'
import { WIDTH_BLOCKS, HEIGHT_BLOCKS } from './constants.js'

export default function createSnake (config) {
  let dead = false
  let anchor = { x: 2, y: 1 }
  const leftWall = ['d1']
  const frontWall = ['l1']
  const rightWall = ['u1']
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
    if (dead) {
      return getState()
    }
    if (opposite(direction) === lastDirection) {
      return getState()
    }
    const newCoordinates = translate[direction](headCoordinates)
    if (occupied.check(newCoordinates)) {
      dead = true
      return getState()
    }
    if (direction === lastDirection) {
      extendEnd(leftWall)
      extendStart(rightWall)
      history.push({ walls: 'lr', coordinates: headCoordinates })
    } else {
      const isClockwise = clockwise(lastDirection) === direction
      if (isClockwise) {
        rotateStart(rightWall, isClockwise)
        addEnd(leftWall, direction)
        addEnd(leftWall, direction)
        history.push({ walls: 'll', coordinates: headCoordinates })
      } else {
        rotateEnd(leftWall, isClockwise)
        addStart(rightWall, opposite(direction))
        addStart(rightWall, opposite(direction))
        history.push({ walls: 'rr', coordinates: headCoordinates })
      }
      rotateStart(frontWall, isClockwise)
    }
    lastDirection = direction
    headCoordinates = newCoordinates
    occupied.set(newCoordinates, true)

    const foundFood = areEqual(food, newCoordinates)

    if (!(extend || foundFood)) {
      const { walls, coordinates } = history.shift()
      walls.split('').forEach(wall => {
        if (wall === 'l') {
          anchor = resolveCoordinates(anchor, `${_.first(leftWall)[0]}1`)[1]
          removeStart(leftWall)
        } else {
          removeEnd(rightWall)
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
      path: [...leftWall, ...frontWall, ...rightWall],
      occupied,
      dead
    }
  }

  return { move, getState }
}
