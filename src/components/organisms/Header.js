import React from 'react'
import Link from '../atoms/Link'

import './Header.css'

const navItems = {
  lists: '/reading-list',
  blog: '/blog',
  snake: '/snake',
  tetris: 'https://kwanman.github.io/tetris/'
}

export default function Header () {
  return (
    <div className='Header'>
      <Link to='/' className='Header-title'>
        <span>tommy </span><span>kwan</span>
      </Link>
      <div className='Header-nav'>
        {Object.keys(navItems).map(key => (
          <Link key={key} className='Header-navItem' to={navItems[key]}>
            {key}
          </Link>
        ))}
      </div>
    </div>
  )
}
