import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../scss/home.scss'
/* *
 * 首页
 * */ 
export default function Home () {
    let navigate = useNavigate()
    return (
        <div className="home">
            <header>
                <h1 className="hd-l">Welcome to</h1>
                <div className="hd-r">
                    <span className="square square_1">2</span>
                    <span className="square square_2">0</span>
                    <span className="square square_3">4</span>
                    <span className="square square_4">8</span>
                </div>
            </header>
            
            <ul>
                <li>
                    <button className="btn" onClick={() => navigate('/game')}>Start Game</button>
                </li>
                <li>
                    <button className="btn" onClick={() => navigate('/ranking')}>Check Ranking</button>
                </li>
            </ul>

            <footer>
                Written in React and Typescript by Swan Cai on May 4th, 2022.
            </footer>
        </div>
    )
}