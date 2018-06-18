import React from 'react'
import format from 'date-fns/format'

export default ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h3>{format(frontmatter.date, 'Do MMMM YYYY')}</h3>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
