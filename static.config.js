import fs from 'fs'
import path from 'path'
import { loadFront as yfm } from 'yaml-front-matter'
import Document from './src/components/Document.js'

const blogDir = path.resolve(__dirname, './src/components/pages/blog')

export default {
  getRoutes: async () => {
    const blogposts = fs.readdirSync(blogDir)
    return [
      {
        path: '/',
        component: './src/components/pages/Home.js'
      },
      {
        path: '/reading-list',
        component: './src/components/pages/ReadingList.js'
      },
      {
        path: '/snake',
        component: './src/components/pages/Snake.js'
      },
      {
        path: '404',
        component: './src/components/pages/404.js'
      },
      ...blogposts.map(l => ({
        path: `/blog/${l.replace(/\.md$/, '')}`,
        component: './src/components/templates/BlogPost.js',
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
