import React from 'react'
import ReactMarkdown from 'react-markdown'

const md = `
# Hello, I'm Tommy.
I’m a product engineer, passionate about solving complex problems with simple solutions.

## I have a few principles that help me design and build the best solutions.

There's not much to do around here yet.

In the meantime, you can go and read a (placeholder) [blog post](/blog/because-the-world-needs-another-blog)

check out what I've been [reading](/reading-list)

play some [snake](/snake)

or maybe [tetris](https://kwanman.github.io/tetris/) is more your taste?

> Love people, use things. The opposite never works.

[_The Minimalists_](https://www.theminimalists.com/people-things/)
`

const principles = [
  `
### Find the problem
Products are built to solve a problem. 

I’m good at asking the right questions and ensure that we understand the problem.

*“Why do I need to write this CV? What is the most important information I need to present?”*`,
  `
### Design in reverse

Products are built for humans. Their journey is most important.

I love collaborating here - with designers, with product managers and with users.

*“What would make me want to continue reading this piece of paper?”*`,
  `
### Implement collaboratively

I believe in understanding the decisions behind what you are building.

Pairing with designers to bring designs to life is the most effective way to do this.

*“I should pair with my designer side so I understand why I’m writing my CV this way.”*`
]
export default () => (
  <div>
    <ReactMarkdown source={md} />
    <div className='row'>
      {principles.map((p, i) => (
        <ReactMarkdown key={i} className='col-xs-12 col-sm-4' source={p} />
      ))}
    </div>
  </div>
)
