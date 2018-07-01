import React from 'react'
import ReactMarkdown from 'react-markdown'

const md = `
I’m a product engineer, passionate about solving complex problems with simple solutions.

There's not much to do around here yet.

You can go and read a few [blog posts](/blog/because-the-world-needs-another-blog)

check out what I'm currently [reading](/reading-list)

play some [snake](/snake)

or is [tetris](https://kwanman.github.io/tetris/) more your taste?

> Love people, use things. The opposite never works.

[_The Minimalists_](https://www.theminimalists.com/people-things/)
`

export default () => <ReactMarkdown source={md} />
