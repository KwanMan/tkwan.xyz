import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from '../atoms/Link'

export default ({ source }) => (
  <div>
    <ReactMarkdown
      source={source}
      renderers={{
        link: ({ href, children }) => <Link to={href}>{children}</Link>
      }}
    />
  </div>
)
