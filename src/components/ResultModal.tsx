/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-25 20:02:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/ResultModal.tsx
 */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface IPropsResultModal {
    isShow: boolean // 是否展示
    bestScore: number // 最高分
    score: number // 当前分数
    onRestart: () => void // 重新开始的方法
    onClose: () => void // 关闭弹窗
}
export default function ResultModal (props: IPropsResultModal) {
    let navigate = useNavigate()
    const [modalClass, setModalClass] = useState<string>('modal')

    useEffect (() => {
        console.log('ResultModal, isShow', props.isShow)
        setModalClass(props.isShow ? 'modal show' : 'modal')
    }, [props.isShow])

    // 关闭弹窗
    const closeModal: (typeName: string) => void = (typeName) => {
        switch (typeName) {
            case 'restart': {
                props.onRestart()
                setModalClass('modal')
                // 因为离场动画需时0.5s，经调试离场顺滑程度，故延迟0.2s移除Dom
                setTimeout(() => {
                    props.onClose()
                }, 200)
                break
            }
            case 'home': {
                navigate(-1)
                break
            }
        }
    }
    // 是否现得分数超越过去最高分
    const isExceeded: boolean = props.score > props.bestScore
    
    const NormalElem: JSX.Element = (
        <>
            <h1 className="title">Game Over</h1>
            <div className="p-score">Current Score：<span className="num cur">{props.score || 0}</span></div>
            <div className="p-score best">Best Score：<span className="num">{ props.bestScore || 0}</span></div>
        </>
    )
    const BestElem: JSX.Element = (
        <>
            <h1 className="title exceed">Congratulations</h1>
            <div className="p-score">You Has Got A Best Score: <span className="num cur best">{props.score || 0}</span></div>
        </>
    )

    return (
        <div className={modalClass}>
            <div className="modal-main">
                { isExceeded ? BestElem : NormalElem }
                <button className="btn btn-restart" onClick={() => closeModal('restart')}>Restart</button>
                <button className="btn btn-home" onClick={() => closeModal('home')}>Home</button>
            </div>
        </div>
    )
}