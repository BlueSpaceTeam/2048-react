/*
 * @Author: fantiga
 * @Date: 2022-04-28 15:18:31
 * @LastEditTime: 2022-05-25 19:13:37
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/src/App.tsx
 */
import React from 'react'
import { Outlet } from 'react-router-dom'

// export default function App () {
// 	return <Outlet />
// }

/**
 * 改函数式写法
 */
const App: React.FC = () => <Outlet />

export default App
