import React from 'react'
import { Router, Link, withSiteData } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'
import 'flexboxgrid2/flexboxgrid2.css'

const App = ({ siteTitle }) => (
  <Router>
    <div className='container'>
      <Routes />
    </div>
  </Router>
)

export default hot(module)(withSiteData(App))
