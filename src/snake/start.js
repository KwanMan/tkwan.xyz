import { BLOCK } from './constants.js'
import createLayer from './createLayer.js'
import createBase from './createBase.js'
import createSnake from './createSnake.js'
import { resolveCoordinates } from './commandPath.js'
import { opposite } from './directions.js'
import keyMap from './keyMap'

const b = n => BLOCK * n

export default function start (mountNode) {
  createBase(mountNode)
  const snakeLayer = createLayer(mountNode, {
    fill: 'green',
    bowing: 0,
    roughness: 0.5,
    fillStyle: 'zigzag'
  })
  const foodLayer = createLayer(mountNode, {
    fill: 'red',
    bowing: 1,
    roughness: 0.5,
    fillStyle: 'zigzag'
  })

  const snake = createSnake({})

  const state = snake.getState()
  let foodCoordinates = state.occupied.getFree()
  draw(state.anchor, state.path)
  drawFood(foodCoordinates, ['r1', 'd1', 'l1'])

  let currentDirection = 'down'

  let t = setTimeout(nextTick, 50)
  function nextTick () {
    const {
      ateFood,
      dead,
      anchor,
      path,
      occupied
    } = snake.move(currentDirection, { food: foodCoordinates })
    if (dead) {
      console.log('YOU LOSE')
      return
    }
    if (ateFood) {
      foodCoordinates = occupied.getFree()
      drawFood(foodCoordinates, ['r1', 'd1', 'l1'])
    }
    draw(anchor, path)
    t = setTimeout(nextTick, 50)
  }

  window.stop = () => clearTimeout(t)
  document.onkeydown = function (e) {
    const code = e.keyCode
    const direction = keyMap[code]
    if (direction && opposite(currentDirection) !== direction) {
      e.preventDefault()
      currentDirection = direction
      // nextTick()
    }
  }

  function draw (anchor, path) {
    let polygonCoordinates = resolveCoordinates(anchor, ...path)
    polygonCoordinates = polygonCoordinates.map(({ x, y }) => {
      return [b(x), b(y)]
    })
    snakeLayer.draw(polygonCoordinates)
  }

  function drawFood (anchor, path) {
    let polygonCoordinates = resolveCoordinates(anchor, ...path)
    polygonCoordinates = polygonCoordinates.map(({ x, y }) => {
      return [b(x), b(y)]
    })
    foodLayer.draw(polygonCoordinates)
  }
}
