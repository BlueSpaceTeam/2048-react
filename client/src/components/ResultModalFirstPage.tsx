/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime:2022-06-06 15:49:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/ResultModalFirstPage.tsx
 */
import React, { useState, useEffect } from 'react'

import ResultLayout from './ResultLayout'

interface IPropsResultModal {
    bestScore: number // 最高分
    score: number // 当前分数
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // 名字改变
    onSubmit: () => void // 提交名字
    onPageChange: (e: number) => void // 更改页码
}

/**
 * modal第一页内容
 **/ 
const ResultModalFirstPage: React.FC<IPropsResultModal> = (props) => {
    return (
        <>
            <ResultLayout score={props.score} bestScore={props.bestScore} />
            <div className="input-wrap">
                <input 
                    className="scorer" 
                    type="text" 
                    placeholder="Input your name to save this record" 
                    maxLength={30} 
                    onChange={props.onChange} 
                />    
            </div>
            <button className="btn btn-submit" onClick={() => props.onSubmit}>Save Ur Name</button>
            <button className="btn btn-no-submit" onClick={() => props.onPageChange}>No, thanks</button>
        </>
    )
}

export default ResultModalFirstPage