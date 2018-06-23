import { HEIGHT, WIDTH, BLOCK } from './constants.js'
import createLayer from './createLayer.js'

export default function createBase (mount) {
  const layer = createLayer(mount)
  const { el } = layer
  const ctx = el.getContext('2d')
  ctx.lineWidth = 0.2
  let topOffset = 0
  while (topOffset <= HEIGHT) {
    ctx.beginPath()
    ctx.moveTo(0, topOffset)
    ctx.lineTo(WIDTH, topOffset)
    ctx.stroke()
    topOffset += BLOCK
  }
  let leftOffset = 0
  while (leftOffset <= WIDTH) {
    ctx.beginPath()
    ctx.moveTo(leftOffset, 0)
    ctx.lineTo(leftOffset, HEIGHT)
    ctx.stroke()
    leftOffset += BLOCK
  }
  return layer
}
