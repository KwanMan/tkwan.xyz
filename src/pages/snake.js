import React from 'react'
import snake from '../snake/start'

export default class Snake extends React.Component {
  render () {
    return (
      <div>
        <div>Press space to play/pause</div>
        <div
          style={{
            position: 'absolute',
            border: '1px solid black',
            width: 440,
            height: 640
          }}
          ref={el => {
            this.el = el
          }}
        />
      </div>
    )
  }
  componentDidMount () {
    snake(this.el)
  }
}
