/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-06 15:49:00
 * @LastEditors: swancai
 * @Description: 
 * @FilePath: /2048-react/src/components/ResultModal.tsx
 */
import React from 'react'

interface IResultLayout {
    bestScore: number // 最高分
    score: number // 当前分数
}

const ResultLayout: React.FC<IResultLayout> = (props) => {
    // 是否现得分数超越过去最高分 展示不同的结果
    return props.score > props.bestScore 
        ? (
            <>
                <h1 className="title exceed">Congratulations</h1>
                <div className="p-score">You has got a best score: <span className="num cur best">{props.score || 0}</span></div>
            </>
        ) 
        : (
            <>
                <h1 className="title">Game Over</h1>
                <div className="p-score">Current Score：<span className="num cur">{(props.score || 0).toLocaleString()}</span></div>
                <div className="p-score best">Best Score：<span className="num">{(props.bestScore || 0).toLocaleString()}</span></div>
            </>
        )
}

export default ResultLayout