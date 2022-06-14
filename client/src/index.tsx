/*
 * @Author: fantiga
 * @Date: 2022-04-28 15:18:31
 * @LastEditTime: 2022-06-14 18:29:55
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/client/src/index.tsx
 */
import './scss/modal.scss'
import './utils/fontSize'

import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
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
        <BrowserRouter>
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
        </BrowserRouter>
    </React.StrictMode>
)