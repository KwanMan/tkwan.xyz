import { translate } from './coordinates.js'
export function resolveCoordinates (start, ...commands) {
  const coords = [start]
  commands.forEach(command => {
    const { direction, steps } = parseCommand(command)
    coords.unshift(translate[direction](coords[0], steps))
  })
  return coords.reverse()
}

export function parseCommand (command) {
  return {
    direction: command[0],
    steps: Number(command.slice(1))
  }
}
