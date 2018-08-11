import React from 'react'
import { Link as ReactStaticLink } from 'react-static'
import classnames from 'classnames'

import './Link.css'

export default function Link ({ className, children, ...props }) {
  return (
    <ReactStaticLink className={classnames('Link', className)} {...props}>
      {children}
    </ReactStaticLink>
  )
}
