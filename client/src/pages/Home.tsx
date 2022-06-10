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

interface IHome {}

/* *
 * 首页
 * */
const Home: React.FC<IHome> = (props) => {
    let navigate = useNavigate()

    const goToGithub: () => void = () => {

        window.location.href = 'https://github.com/BlueSpaceTeam'
    }

    return (
        <div className="home">
            <header>
                <h1 className="hd-l">Blue Space</h1>
                <div className="hd-r">
                    <span className="square square_1">2</span>
                    <span className="square square_2">0</span>
                    <span className="square square_3">4</span>
                    <span className="square square_4">8</span>
                </div>
            </header>

            <ul>
                <li>
                    <button className="btn" onClick={() => navigate('/game')}>Play</button>
                </li>
                <li>
                    <button className="btn" onClick={() => navigate('/ranking')}>Ranking</button>
                </li>
            </ul>

            <footer>
                <p><a className="link" href="javascript:;" onClick={goToGithub}>Blue Space Team</a>, on June 9th, 2022.</p>
                <p>Written in React18 / Typescript / Python3 / SQLite3.</p>
            </footer>
        </div>
    )
}

export default Home