import fs from 'fs'
import path from 'path'
import { loadFront as yfm } from 'yaml-front-matter'
import Document from './src/components/Document.js'

const blogDir = path.resolve(__dirname, './src/pages/blog')

export default {
  getSiteData: () => ({
    siteTitle: 'tkwan.xyz'
  }),
  getRoutes: async () => {
    const blogposts = fs.readdirSync(blogDir)
    return [
      {
        path: '/',
        component: './src/pages/Home.js'
      },
      {
        path: '/reading-list',
        component: './src/pages/ReadingList.js'
      },
      {
        path: '/snake',
        component: './src/pages/Snake.js'
      },
      {
        path: '404',
        component: './src/pages/404.js'
      },
      ...blogposts.map(l => ({
        path: `/blog/${l.replace(/\.md$/, '')}`,
        component: './src/pageTemplates/BlogPost.js',
        getData: () => readYfm(path.resolve(blogDir, l))
      }))
    ]
  },
  Document
}

function readYfm (location) {
  const raw = fs.readFileSync(location, { encoding: 'utf8' })
  const { __content: content, ...meta } = yfm(raw)

  return {
    content,
    ...meta
  }
}
