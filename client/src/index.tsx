/*
 * @Author: fantiga
 * @Date: 2022-04-28 15:18:31
 * @LastEditTime: 2022-05-27 17:54:51
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/src/index.tsx
 */
import './scss/modal.scss'
import './utils/fontSize'

import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import Home from './pages/Home'
import Game from './pages/Game'
import Ranking from './pages/Ranking'


/**
 * React 18 新写法
 */
const container: HTMLElement = document.getElementById('root')!
// 创建一个root。
const root = createRoot(container)
// 初始渲染：将一个元素渲染到root。
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="*" element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </HashRouter>
    </React.StrictMode>
)