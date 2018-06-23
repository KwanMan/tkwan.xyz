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
  d ({ x, y }) {
    return { x, y: y + 1 }
  },

  u ({ x, y }) {
    return { x, y: y - 1 }
  },

  l ({ x, y }) {
    return { x: x - 1, y }
  },

  r ({ x, y }) {
    return { x: x + 1, y }
  }
}

export const translate = new Proxy(translations, {
  get (obj, prop) {
    return obj[prop[0]]
  }
})
