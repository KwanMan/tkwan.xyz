import React from 'react'
import { withRouteData } from 'react-static'
import Markdown from '../molecules/Markdown'

function MarkdownPage ({ content }) {
  return <Markdown source={content} />
}

export default withRouteData(MarkdownPage)
