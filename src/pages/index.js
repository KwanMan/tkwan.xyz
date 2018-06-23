import React from 'react'
import ReactMarkdown from 'react-markdown'

const md = `
Hey, you.

There's not much to do around here yet.

You can go and read a few [blog posts](/blog/minimalism)

or play some [snake](/snake)

maybe even [tetris](https://kwanman.github.io/tetris/)

> Love people. Use things. The opposite never works.
`

export default () => (
  <div style={{ margin: '3rem auto', maxWidth: 600 }}>
    <ReactMarkdown source={md} />
  </div>
)
