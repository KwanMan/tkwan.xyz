import React from 'react'
import ReactMarkdown from 'react-markdown'

const md = `
I’m a product engineer, passionate about solving complex problems with simple solutions.

There's not much to do around here yet.

It's always been on my list to have a personal site, but I never managed to decide what to put on it. So I've decided to just spin up an empty site, and add random stuff to it as ideas pop into my head.

In the meantime, you can go and read a (placeholder) [blog post](/blog/because-the-world-needs-another-blog)

check out what I've been [reading](/reading-list)

play some [snake](/snake)

or maybe [tetris](https://kwanman.github.io/tetris/) is more your taste?

> Love people, use things. The opposite never works.

[_The Minimalists_](https://www.theminimalists.com/people-things/)
`

export default () => <ReactMarkdown source={md} />
