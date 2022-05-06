import React from 'react'
import Square from './Square'
export default function Board (props: any) {
    // const Squares = new Array(16).fill(0).map((n, idx) => {
    //   return <Square num={2**(idx + 1)} key={idx} />
    // })
    const Squares = new Array(16).fill(0).map((n, idx) => {
      return <Square num={n} key={idx} />
    })
    return (
        <div className="board">
          {Squares}
        </div>
    )
} 