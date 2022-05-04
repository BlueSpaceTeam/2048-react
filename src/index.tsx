/*
 * @Author: fantiga
 * @Date: 2022-04-28 15:18:31
 * @LastEditTime: 2022-04-28 17:55:46
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/src/index.tsx
 */
import './scss/game.scss';

import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'

/**
 * React 18 新写法
 */
const container: HTMLElement = document.getElementById('root')!;
// 创建一个root。
const root = createRoot(container)
// 初始渲染：将一个元素渲染到root。
root.render(<App/>)