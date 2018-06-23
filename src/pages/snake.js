import React from 'react'
import snake from '../snake/start'

export default class Snake extends React.Component {
  render () {
    return (
      <div
        style={{
          position: 'absolute',
          border: '1px solid black',
          width: 500,
          height: 700
        }}
        ref={el => {
          this.el = el
        }}
      />
    )
  }
  componentDidMount () {
    snake(this.el)
  }
}
