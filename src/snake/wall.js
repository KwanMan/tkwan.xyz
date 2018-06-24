import _ from 'lodash'
import { parseCommand } from './commandPath.js'
import * as directions from './directions.js'
export default function createWall (init) {
  const wall = [...init]

  function get () {
    return [...wall]
  }

  function getReverse () {
    return [...wall].reverse().map(command => {
      const { direction, steps } = parseCommand(command)
      return `${directions.opposite(direction)}${steps}`
    })
  }

  function rotate (direction, clockwise) {
    return clockwise
      ? directions.clockwise(direction)
      : directions.anticlockwise(direction)
  }

  function rotateFront (clockwise) {
    const { direction } = parseCommand(_.last(wall))
    const newDirection = rotate(direction, clockwise)
    removeFront(wall)
    addFront(newDirection)
  }

  function rotateBack (clockwise) {
    const { direction } = parseCommand(_.first(wall))
    const newDirection = rotate(direction, clockwise)
    removeBack(wall)
    addBack(newDirection)
  }

  function extendBack () {
    const toAdd = parseCommand(_.first(wall)).direction
    addBack(toAdd)
  }
  function extendFront () {
    const toAdd = parseCommand(_.last(wall)).direction
    addFront(toAdd)
  }

  function addBack (direction) {
    if (!wall.length) return wall.push(`${direction}1`)
    const firstCommand = parseCommand(_.first(wall))
    if (firstCommand.direction === direction) {
      wall[0] = `${direction}${firstCommand.steps + 1}`
    } else {
      wall.unshift(`${direction}1`)
    }
  }

  function addFront (direction) {
    if (!wall.length) return wall.unshift(`${direction}1`)
    const lastCommand = parseCommand(_.last(wall))
    if (lastCommand.direction === direction) {
      wall[wall.length - 1] = `${direction}${lastCommand.steps + 1}`
    } else {
      wall.push(`${direction}1`)
    }
  }

  function removeBack () {
    const firstCommand = parseCommand(_.first(wall))
    if (firstCommand.steps === 1) {
      wall.shift()
    } else {
      wall[0] = `${firstCommand.direction}${firstCommand.steps - 1}`
    }
  }

  function removeFront () {
    const lastCommand = parseCommand(_.last(wall))
    if (lastCommand.steps === 1) {
      wall.pop()
    } else {
      wall[wall.length - 1] = `${lastCommand.direction}${lastCommand.steps - 1}`
    }
  }

  return {
    get,
    getReverse,
    extendBack,
    extendFront,
    addBack,
    addFront,
    removeBack,
    removeFront,
    rotateBack,
    rotateFront
  }
}
