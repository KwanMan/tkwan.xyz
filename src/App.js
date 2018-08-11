import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'

import './App.css'

function App () {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes />
        <Footer className='App-footer' />
      </div>
    </Router>
  )
}

export default hot(module)(App)
