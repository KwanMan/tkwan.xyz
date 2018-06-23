import co, { stringify } from './coordinates.js'
export default function createCoordinateMap (width, height, initial) {
  const occupied = { ...initial }

  const api = {
    set ({ x, y }, val) {
      occupied[stringify({ x, y })] = val
    },
    check ({ x, y }) {
      return !!occupied[stringify({ x, y })]
    },
    getFree () {
      let coordinates
      while (!coordinates || api.check(coordinates)) {
        coordinates = co(random(width - 1), random(height - 1))
      }
      return coordinates
    }
  }
  return api
}

function random (max) {
  return Math.floor(Math.random() * (max + 1))
}
