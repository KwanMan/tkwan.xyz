import React from 'react'
import format from 'date-fns/format'
import { withRouteData } from 'react-static'
import Markdown from '../molecules/Markdown'

const BlogPost = props => {
  const { content, meta } = props
  return (
    <div>
      <h1>{meta.title}</h1>
      <h3>{format(meta.date, 'Do MMMM YYYY')}</h3>
      <Markdown source={content} />
    </div>
  )
}

export default withRouteData(BlogPost)
