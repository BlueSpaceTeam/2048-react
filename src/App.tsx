import React from 'react'

import Square from './components/Square'
import Board from './components/Board'

export default function App() {
  const Squares = new Array(16).fill(0).map((n, idx) => {
    return <Square num={2**(idx + 1)} />
  })
  return (
    <div className="game">
      <header>
        <div className="logo">2048</div>
        <div className="score">
          <span className="key">SCORE</span>
          <span>345</span>
        </div>
        <div className="score best">
          <span className="key">BEST</span>
          <span>34.5K</span>
        </div>
        <button className="btn btn-new">NEW</button>
        <button className="btn btn-undo">UNDO</button>
      </header>
      <main>
        <p className="desc">Join the numbers and get to the 2048 tile!</p>

        <div className="board">
          {Squares}
        </div>
      </main>
      <footer>
        <span>Written in React and Typescript</span>
        <span>by Swan Cai</span>
        <span>on May 4th, 2022.</span>
      </footer>
    </div>
  )
}
