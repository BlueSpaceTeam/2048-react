/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-26 17:00:47
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/src/pages/Home.tsx
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../scss/home.scss'
/* *
 * 首页
 * */
const Home: React.FC<{}> = ({}) => {
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

export default Home