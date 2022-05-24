/*
 * @Author: fantiga
 * @Date: 2022-04-28 15:18:31
 * @LastEditTime: 2022-04-28 17:55:46
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/src/index.tsx
 */
import './scss/modal.scss'
import './fontSize'

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Game from './pages/Game'
import Ranking from './pages/Ranking'

/**
 * React 18 新写法
 */
const container: HTMLElement = document.getElementById('root')!;
// 创建一个root。
const root = createRoot(container)
// 初始渲染：将一个元素渲染到root。
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<Home />} />
                    <Route path="game" element={<Game />} />
                    <Route path="ranking" element={<Ranking />} />
                    {/* 只能针对使用了Link标签的，不针对手动输入链接那种 */}
                    <Route path="*" element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)