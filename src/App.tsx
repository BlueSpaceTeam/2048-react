import React from 'react'

import Score from './components/Score'
import Board from './components/Board'

export default function App() {
  return (
    <div className="game">
      <header>
        <div className="logo">2048</div>
        <Score name="SCORE" num={345} />
        <Score name="BEST" num={'34.5K'} />
        <button className="btn btn-new" onClick={() => alert('new')}>NEW</button>
        <button className="btn btn-undo" onClick={() => alert('undo')}>UNDO</button>
      </header>
      <main>
        <p className="desc">Join the numbers and get to the 2048 tile!</p>
        <Board />
      </main>
      <footer>
        <span>Written in React and Typescript</span>
        <span>by Swan Cai</span>
        <span>on May 4th, 2022.</span>
      </footer>
    </div>
  )
}
