import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from '../atoms/Link'

export default function Markdown ({ source }) {
  return (
    <div>
      <ReactMarkdown
        className='Markdown'
        source={source}
        renderers={{
          link: ({ href, children }) => <Link to={href}>{children}</Link>
        }}
        escapeHtml={false}
      />
    </div>
  )
}
