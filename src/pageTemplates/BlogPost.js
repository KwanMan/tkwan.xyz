import React from 'react'
import format from 'date-fns/format'
import ReactMarkdown from 'react-markdown'
import { withRouteData } from 'react-static'

const BlogPost = props => {
  const { title, date, content } = props
  return (
    <div>
      <h1>{title}</h1>
      <h3>{format(date, 'Do MMMM YYYY')}</h3>
      <ReactMarkdown source={content} />
    </div>
  )
}

export default withRouteData(BlogPost)
