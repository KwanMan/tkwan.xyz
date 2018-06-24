import _ from 'lodash'
import createLayer from './createLayer.js'
import createBase from './createBase.js'
import createSnake from './createSnake.js'
import { opposite } from './directions.js'
import { translate } from './coordinates.js'
import keyMap from './keyMap'

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
  snakeLayer.draw(state.coordinates)
  drawFood(foodCoordinates, ['r', 'd', 'l'])

  let currentDirection = 'down'
  let score = 0
  let tick = 100

  let t = setTimeout(nextTick, 50)
  function nextTick () {
    const {
      ateFood,
      dead,
      occupied,
      coordinates
    } = snake.move(currentDirection, { food: foodCoordinates })
    if (dead) {
      console.log('YOU LOSE')
      return
    }
    if (ateFood) {
      score++
      if (score < 25) tick -= 2
      else if (score < 40) tick -= 1
      else if (score < 65) tick -= 0.5
      else tick -= 0.25
      tick = Math.max(tick, 15)
      console.log(`score: ${score}`)
      console.log(`tick: ${tick}`)
      foodCoordinates = occupied.getFree()
      drawFood(foodCoordinates, ['r1', 'd1', 'l1'])
    }
    snakeLayer.draw(coordinates)
    t = setTimeout(nextTick, tick)
  }

  window.stop = () => clearTimeout(t)
  document.onkeydown = function (e) {
    const code = e.keyCode
    const direction = keyMap[code]
    if (direction && opposite(currentDirection) !== direction) {
      e.preventDefault()
      currentDirection = direction
    }
  }

  function drawFood (start, path) {
    let polygonCoordinates = [start]
    path.forEach(direction => {
      const prev = _.last(polygonCoordinates)
      polygonCoordinates.push(translate[direction](prev))
    })
    foodLayer.draw(polygonCoordinates)
  }
}
