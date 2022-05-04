import React from 'react'

export default function App() {
  const Squares = new Array(16).fill(null).map((n, idx) => {
    return idx % 2 === 0 
      ? (
        <div className="square">
          <div className="number">{idx}</div>
        </div>
      )
      : (
        <div className="square">
          <div className="number show">{idx}</div>
        </div>
      )
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
