import React from 'react'
import classnames from 'classnames'

import './Footer.css'

export default function Footer ({ className }) {
  return (
    <div className={classnames('Footer', className)}>
      © tommy kwan 2018, hand crafted with caffeine in london 🇬🇧
    </div>
  )
}
