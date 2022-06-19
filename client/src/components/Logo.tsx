/*
 * @Author: Swan Cai
 * @Date: 2022-06-19 09:51:00
 * @LastEditTime: 2022-06-19 09:51:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/client/src/components/Logo.tsx
 */
import React, { useState } from 'react'

interface ILogo {}

/* 连续点击6次触发版本号 */
const Logo: React.FC<ILogo> = (props) => {
    const [ isVersion, setIsVersion ] = useState<boolean>(false)

    let timer: NodeJS.Timeout
    const waitTime = 200 // 该时间间隔内点击才算连续点击（单位：ms）
    let lastTime = new Date().getTime() // 上次点击时间
    let count = 0 // 连续点击次数

    const handleClick: () => void = () => {
        let currentTime = new Date().getTime()
        // 计算两次相连的点击时间间隔
        count = (currentTime-lastTime) < waitTime ? count + 1 : 1
        lastTime = new Date().getTime()
        clearTimeout(timer)
        timer = setTimeout(() => {
            clearTimeout(timer)
            // 处理点击事件
            // console.log(count)

            if (count > 5) {
                // 连续点击6次或者6次以上的点击事件
                // console.log('点击超过5次了')
                setIsVersion(true)
                setTimeout(() => setIsVersion(false), 5000)
            }
        }, waitTime + 10)
    }


    return isVersion 
        ? <div className="logo version">Version: 1.2</div> 
        : <div className="logo" onClick={handleClick}>2048</div> 
}

export default Logo