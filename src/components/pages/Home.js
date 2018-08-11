import React from 'react'
import Markdown from '../molecules/Markdown'

const md = `
I’m a product engineer, passionate about solving complex problems with simple solutions.

There's not much around here yet.

In the meantime, you can go and read a (placeholder) [blog post](/blog/because-the-world-needs-another-blog)

check out what I've been [reading](/reading-list)

play some [snake](/snake)

or maybe [tetris](https://kwanman.github.io/tetris/) is more your taste?

> Love people, use things. The opposite never works.

[_The Minimalists_](https://www.theminimalists.com/people-things/)
`

export default () => <Markdown source={md} />
