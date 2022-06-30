/*
 * @Author: fantiga
 * @Date: 2022-04-28 15:18:31
 * @LastEditTime: 2022-06-30 20:28:36
 * @LastEditors: tim.wen
 * @Description:
 * @FilePath: /2048-react/react/src/index.tsx
 */

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import '@utils/i18n';
import '@utils/fontSize';
import Home from './pages/Home';
import Game from './pages/Game';
import Ranking from './pages/Ranking';

import './scss/modal.scss';

/**
 * React 18 新写法
 */
// const container: HTMLElement = document.getElementById('root')!;
const container: HTMLElement =
  document.getElementById('root') || document.createElement('div');
// 创建一个root。
const root = createRoot(container);
// 初始渲染：将一个元素渲染到root。
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There&apos;s nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
