import _ from 'lodash'
import * as directions from './directions.js'
import { translate } from './coordinates.js'
export default function createWall (startCoordinates, startDirection) {
  const cmds = [startDirection]
  const coordinates = [
    startCoordinates,
    translate[startDirection](startCoordinates)
  ]

  function getCoordinates () {
    return [...coordinates]
  }
  function getCoordinatesReverse () {
    return getCoordinates().reverse()
  }

  function rotateFront (clockwise) {
    const direction = _.last(cmds)
    const newDirection = clockwise
      ? directions.clockwise(direction)
      : directions.anticlockwise(direction)
    removeFront()
    addFront(newDirection)
  }

  function addFront (direction) {
    const newFrontCoordinate = translate[direction](
      coordinates[coordinates.length - 1]
    )
    if (_.last(cmds) === direction) {
      coordinates[coordinates.length - 1] = newFrontCoordinate
    } else {
      coordinates.push(newFrontCoordinate)
    }
    cmds.push(direction)
  }

  function removeBack () {
    const direction = cmds[0]
    if (cmds[0] !== cmds[1]) {
      coordinates.shift()
    } else {
      coordinates[0] = translate[direction](coordinates[0])
    }
    cmds.shift()
  }

  function removeFront () {
    const direction = _.last(cmds)
    if (_.last(cmds) !== cmds[cmds.length - 2]) {
      coordinates.pop()
    } else {
      const frontCoordinate = coordinates[coordinates.length - 1]
      const translateDirection = directions.opposite(direction)
      const newFrontCoordinate = translate[translateDirection](frontCoordinate)
      coordinates[coordinates.length - 1] = newFrontCoordinate
    }
    cmds.pop()
  }

  return {
    getCoordinates,
    getCoordinatesReverse,
    addFront,
    removeBack,
    removeFront,
    rotateFront,
    getCmds: () => [...cmds]
  }
}
