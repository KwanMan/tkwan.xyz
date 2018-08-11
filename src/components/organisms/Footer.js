import React from 'react'
import classnames from 'classnames'

import './Footer.css'

export default function Footer ({ className }) {
  return (
    <div className={classnames('Footer', className)}>
      hand crafted in 🇬🇧 with caffeine
    </div>
  )
}
