import React from 'react'
import ReactMarkdown from 'react-markdown'

import './reading-list.css'

const md = `
# Some books I've been reading

I've always wanted to write about books I've read. Not reviews, but how it changed how I thought, how I looked at the world. I have a lot of random notes dotted around, snippets of paragraphs I've attempted, mostly incomprehensible to anyone by myself, but I've decided to post them all here, as I come across them. I've begun trying to list everything I remember reading (read: found in my Amazon order history) in the past few years.

### Right now
- Originals: How Non-conformists Change the World, by Adam Grant
- Dance Dance Dance, by Haruki Murakami

### Up next

#### Already on the bookshelf
- Homo Deus: A Brief History of Tomorrow, by Yuval Noah Harari
- The Martian, by Andy Weir
- Mindhunter, by John Douglas and Mark Olshaker

#### On the wishlist
- The World Without Us, by Alan Weisman
- Food of the Gods, by Terence McKenna
- The 4-Hour Workweek, by Timothy Ferriss

#### Maybe, maybe not
- Deep Work, by Cal Newport
- Anything You Want, by Derek Sivers
- Choose Wonder Over Worry, by Amber Rae

### 2018
- In Order to Live: A North Korean Girl's Journey to Freedom, by Park Yeonmi
- So Much I Want to Tell You, by Anna Akana

### 2017
- Artemis, by Andy Weir
- Sapiens: A Brief History of Humankind, by Yuval Noah Harari
- Leaders Eat Last, by Simon Sinek

### 2016
- The Phoenix Project
- Sprint, by Jake Knapp

### 2015
- Straight to Hell, by John Fevre
- You're Never Weird on the Internet (Almost), by Felicia Day
- Quiet, by Susan Cain
- Ender's Game, by Orson Scott Card
- Freakonomics, by Stephen J. Dubner
- The Life-Changing Magic of Tidying, by Marie Kondo

### Some time before...
- Steve Jobs, by Walter Isaacson
`

export default () => <ReactMarkdown source={md} />
