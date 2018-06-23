import _ from 'lodash'
import co from './coordinates.js'
import * as directions from './directions.js'
export function resolveCoordinates (start, ...commands) {
  const coords = [start]
  commands.forEach(command => {
    const { x: prevX, y: prevY } = coords[0]
    const { direction, steps } = parseCommand(command)
    switch (direction) {
      case 'u':
        return coords.unshift(co(prevX, prevY - steps))
      case 'd':
        return coords.unshift(co(prevX, prevY + steps))
      case 'l':
        return coords.unshift(co(prevX - steps, prevY))
      case 'r':
        return coords.unshift(co(prevX + steps, prevY))
    }
  })
  return coords.reverse()
}

function parseCommand (command) {
  return {
    direction: command[0],
    steps: Number(command.slice(1))
  }
}

function rotate (direction, clockwise) {
  return clockwise
    ? directions.clockwise(direction)
    : directions.anticlockwise(direction)
}

export function rotateStart (wall, clockwise) {
  const { direction } = parseCommand(_.first(wall))
  const newDirection = rotate(direction, clockwise)
  removeStart(wall)
  addStart(wall, newDirection)
}

export function rotateEnd (wall, clockwise) {
  const { direction } = parseCommand(_.last(wall))
  const newDirection = rotate(direction, clockwise)
  removeEnd(wall)
  addEnd(wall, newDirection)
}

export function extendEnd (wall) {
  const toAdd = parseCommand(_.last(wall)).direction
  addEnd(wall, toAdd)
}
export function extendStart (wall) {
  const toAdd = parseCommand(_.first(wall)).direction
  addStart(wall, toAdd)
}

// add to end
export function addEnd (wall, direction) {
  if (!wall.length) return wall.push(`${direction}1`)
  const lastCommand = parseCommand(_.last(wall))
  if (lastCommand.direction === direction) {
    wall[wall.length - 1] = `${direction}${lastCommand.steps + 1}`
  } else {
    wall.push(`${direction}1`)
  }
}
// add to start
export function addStart (wall, direction) {
  if (!wall.length) return wall.unshift(`${direction}1`)
  const firstCommand = parseCommand(_.first(wall))
  if (firstCommand.direction === direction) {
    wall[0] = `${direction}${firstCommand.steps + 1}`
  } else {
    wall.unshift(`${direction}1`)
  }
}
// remove from end
export function removeEnd (wall) {
  const lastCommand = parseCommand(_.last(wall))
  if (lastCommand.steps === 1) {
    wall.pop()
  } else {
    wall[wall.length - 1] = `${lastCommand.direction}${lastCommand.steps - 1}`
  }
}
// remove from start
export function removeStart (wall) {
  const firstCommand = parseCommand(_.first(wall))
  if (firstCommand.steps === 1) {
    wall.shift()
  } else {
    wall[0] = `${firstCommand.direction}${firstCommand.steps - 1}`
  }
}
