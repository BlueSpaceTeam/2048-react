/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime:2022-06-06 15:49:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/ResultModalSecondPage.tsx
 */
import React, { useState, useEffect } from 'react'

import RankList from './RankList'
import ResultLayout from './ResultLayout'

interface IRankItem {
    id: string | number // id
    user_name: string  // 用户名
    user_score: number // 得分
    created_time: string // 创建时间
}
interface IPropsResultModal {
    isSubmit: boolean // 是否提交记录者名称
    list: IRankItem[] // 历史记录
    myInfo: IRankItem // 本次游戏记录
    bestScore: number // 最高分
    score: number // 当前分数
    onRestart: () => void // 提交名字
    onHome: (e: number) => void // 更改页码
}

/**
 * modal第一页内容
 **/ 
const ResultModalSecondPage: React.FC<IPropsResultModal> = (props) => {
    return (
        <>
            {
                props.isSubmit
                    ? <RankList list={props.list} myInfo={props.myInfo} />
                    : <ResultLayout score={props.score} bestScore={props.bestScore} />
            }
            <button className="btn btn-restart" onClick={() => props.onRestart}>Restart</button>
            <button className="btn btn-home" onClick={() => props.onHome}>Home</button>
        </>   
    )
}

export default ResultModalSecondPage