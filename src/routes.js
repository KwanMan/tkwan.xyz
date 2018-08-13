import fs from 'fs'
import path from 'path'
import klaw from 'klaw-sync'
import { loadFront as yfm } from 'yaml-front-matter'
import escape from 'escape-string-regexp'

const pagesDir = path.resolve(__dirname, 'pages')
const templatesDir = path.resolve(__dirname, 'components/templates')

export default async function getRoutes () {
  const routes = []
  const pages = klaw(pagesDir)
  pages.forEach(file => {
    const ext = path.extname(file.path)
    const publicPath = getPublicPath(file.path)
    if (ext === '.md') {
      const { meta } = readYfm(file.path)
      routes.push({
        path: publicPath,
        component: path.resolve(templatesDir, meta.template || 'MarkdownPage'),
        // always refetch data so we don't have to restart dev server
        getData: () => readYfm(file.path)
      })
    }
    if (ext === '.js') {
      routes.push({
        path: publicPath,
        component: file.path
      })
    }
  })
  return routes
}

function getPublicPath (fullPath) {
  const ext = path.extname(fullPath)
  let publicPath = fullPath
    .replace(new RegExp('^' + escape(pagesDir)), '')
    .replace(new RegExp(escape(ext) + '$'), '')
  if (publicPath.endsWith('/index')) {
    publicPath = publicPath.replace(/index$/, '')
  }
  return publicPath
}

function readYfm (location) {
  const raw = fs.readFileSync(location, { encoding: 'utf8' })
  const { __content: content, ...meta } = yfm(raw)

  return { content, meta }
}
