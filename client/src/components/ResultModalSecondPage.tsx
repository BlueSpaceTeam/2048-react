/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime:2022-06-06 15:49:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/ResultModalSecondPage.tsx
 */
import React from 'react'

import RankList from './RankList'
import ResultLayout from './ResultLayout'

import { IRankItem } from '../utils/constants'

interface IPropsResultModal {
    isSubmit: boolean // 是否提交记录者名称
    list: IRankItem[] // 历史记录
    myInfo: IRankItem // 本次游戏记录
    bestScore: number // 最高分
    score: number // 当前分数
    onClose: (type: string) => void // 关闭弹窗
}

/**
 * modal第一页内容
 **/ 
const ResultModalSecondPage: React.FC<IPropsResultModal> = (props) => {
    const RankUI: JSX.Element = (
        <>
            <div className="my-rank">
                <span className="position blue">{props.myInfo.rank_num || 0}</span>
                <span className="name">{props.myInfo.user_name || '-'}</span>
                <span className="score">{props.myInfo.user_score || 0}</span>
                <span className="flag blue">Yours</span>
            </div>
            <RankList list={props.list} isShort />
        </>
    )
    return (
        <>
            {
                props.isSubmit
                    ? RankUI
                    : <ResultLayout score={props.score} bestScore={props.bestScore} />
            }
            <button className="btn btn-restart" onClick={() => props.onClose('restart')}>Play Again</button>
            <button className="btn btn-home" onClick={() => props.onClose('home')}>Home</button>
        </>   
    )
}

export default ResultModalSecondPage