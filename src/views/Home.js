import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
class Home extends Component {
  render() {
    return (
      <div className="Homepage">
        <div className="header">
          <h1> Face recognition </h1>
        </div>

        <div className="flex">
          <a>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              {' '}
              Train{' '}
            </Link>
          </a>
          <a>
            <Link to="/video" style={{ textDecoration: 'none' }}>
              {' '}
              Camera{' '}
            </Link>
          </a>
          <a>
            <Link to="/photo" style={{ textDecoration: 'none' }}>
              {' '}
              Photo{' '}
            </Link>
          </a>
        </div>
      </div>
    )
  }
}

export default Home
