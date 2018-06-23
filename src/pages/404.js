import React from 'react'
import ReactMarkdown from 'react-markdown'

const md = `
# Nothing here

You just hit a route that doesn't exist... the pain... the shame... the sadness...

Now let's just go and play some [snake](/snake)
`
const NotFoundPage = () => <ReactMarkdown source={md} />

export default NotFoundPage
