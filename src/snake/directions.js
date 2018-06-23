export function clockwise (direction) {
  return {
    u: 'r',
    r: 'd',
    d: 'l',
    l: 'u',
    up: 'right',
    right: 'down',
    down: 'left',
    left: 'up'
  }[direction]
}

export function anticlockwise (direction) {
  return {
    u: 'l',
    l: 'd',
    d: 'r',
    r: 'u',
    up: 'left',
    left: 'down',
    down: 'right',
    right: 'up'
  }[direction]
}

export function opposite (direction) {
  return {
    u: 'd',
    d: 'u',
    l: 'r',
    r: 'l',
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  }[direction]
}
