import React from 'react'
import { Router, Link, withSiteData } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

const App = ({ siteTitle }) => (
  <Router>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem'
      }}
    >
      <h1 style={{ margin: 0, textAlign: 'center', marginBottom: '1.45rem' }}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          {siteTitle}
        </Link>
      </h1>
      <Routes />
    </div>
  </Router>
)

export default hot(module)(withSiteData(App))
