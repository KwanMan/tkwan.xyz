export function parse (string) {
  const [x, y] = string.split(',')
  return { x: Number(x), y: Number(y) }
}

export function stringify ({ x, y }) {
  return `${x},${y}`
}

export function areEqual (a, b) {
  return a && b && stringify(a) === stringify(b)
}

export default function co (x, y) {
  return { x, y }
}

const translations = {
  d ({ x, y }, steps = 1) {
    return { x, y: y + steps }
  },

  u ({ x, y }, steps = 1) {
    return { x, y: y - steps }
  },

  l ({ x, y }, steps = 1) {
    return { x: x - steps, y }
  },

  r ({ x, y }, steps = 1) {
    return { x: x + steps, y }
  }
}

export const translate = new Proxy(translations, {
  get (obj, prop) {
    return obj[prop[0]]
  }
})
