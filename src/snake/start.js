import _ from 'lodash'
import createLayer from './createLayer.js'
import createBaseLayer from './createBaseLayer'
import createSnake from './createSnake.js'
import { opposite } from './directions.js'
import { translate } from './coordinates.js'
import keyMap, { SPACE_KEY } from './keyMap'

export default function start (mountNode) {
  createBaseLayer(mountNode)
  const snakeLayer = createLayer(mountNode, {
    fill: 'green',
    bowing: 0,
    roughness: 0.5,
    fillStyle: 'zigzag'
  })
  const foodLayer = createLayer(mountNode, {
    fill: 'orange',
    bowing: 1,
    roughness: 0.5,
    fillStyle: 'zigzag'
  })

  const snake = createSnake()

  const state = snake.getState()
  let foodLocation = state.occupied.getFree()

  const gameState = {
    currentDirection: 'down',
    lastDirection: 'down',
    started: false,
    paused: false,
    score: 0,
    tick: 100
  }

  let t
  function begin () {
    gameState.started = true
    setTimeout(() => nextTick({ begin: true }), gameState.tick)
  }
  function nextTick ({ begin } = {}) {
    if (begin) {
      drawSnake(snake)
      drawFood()
    }
    const { ateFood, died } = snake.move(gameState.currentDirection, {
      food: foodLocation
    })
    gameState.lastDirection = gameState.currentDirection
    if (died) {
      console.log('YOU LOSE')
      drawSnake(snake, { fill: 'red' })
      setTimeout(() => drawSnake(snake), 300)
      setTimeout(() => drawSnake(snake, { fill: 'red' }), 600)
      setTimeout(() => drawSnake(snake), 900)
      setTimeout(() => drawSnake(snake, { fill: 'red' }), 1200)
      return
    }
    if (ateFood) {
      gameState.score++
      gameState.tick = Math.max(calculateNewTick(gameState), 15)
      console.log(`score: ${gameState.score}`)
      console.log(`tick: ${gameState.tick}`)
      foodLocation = snake.getState().occupied.getFree()
      drawFood()
    }
    drawSnake(snake)
    if (!gameState.paused) t = setTimeout(nextTick, gameState.tick)
  }

  function pause () {
    gameState.paused = true
    clearTimeout(t)
    drawSnake(snake, { fill: 'grey' })
    drawFood({ fill: 'grey' })
  }

  function unpause () {
    gameState.paused = false
    drawSnake(snake, { fill: 'grey' })
    drawFood()
    t = setTimeout(nextTick, gameState.tick)
  }

  function calculateNewTick ({ score, tick }) {
    if (score < 25) return tick - 2
    else if (score < 40) return tick - 1
    else if (score < 65) return tick - 0.5
    else return tick - 0.25
  }

  document.onkeydown = function (e) {
    if (!gameState.started) {
      if (e.keyCode === SPACE_KEY) {
        begin()
      }
      return
    }
    if (gameState.paused) {
      if (e.keyCode === SPACE_KEY) return unpause()
    } else {
      if (e.keyCode === SPACE_KEY) return pause()
      const direction = keyMap[e.keyCode]
      if (direction && opposite(gameState.lastDirection) !== direction) {
        e.preventDefault()
        gameState.currentDirection = direction
      }
    }
  }

  function drawSnake (snake, style = {}) {
    const { coordinates } = snake.getState()
    snakeLayer.draw(coordinates, style)
  }

  function drawFood (style = {}) {
    let polygonCoordinates = [foodLocation]
    ;['r', 'd', 'l'].forEach(direction => {
      const prev = _.last(polygonCoordinates)
      polygonCoordinates.push(translate[direction](prev))
    })
    foodLayer.draw(polygonCoordinates, style)
  }
}
