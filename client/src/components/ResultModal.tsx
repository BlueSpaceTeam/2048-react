/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-26 08:52:00
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

/**
 * modal结果内容
 **/ 
const ResultModal: React.FC<IPropsResultModal> = (props) => {
    let navigate = useNavigate()
    const [modalClass, setModalClass] = useState<string>('modal')
    const [scorer, setScorer] = useState<string>('')
    const [isSubmit, setIsSubmit] = useState<boolean>(false) // 是否提交过

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
    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        console.log(e.target.value)
        setScorer(e.target.value)
    }

    const onSubmit: () => void = () => {
        alert(scorer)
        setIsSubmit(true)
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

    const SubmitElem: JSX.Element = isSubmit 
        ? <p className="submit-tip">Submit Successfully!</p>
        : (
            <>
                <div className="input-wrap">
                    <input className="scorer" type="text" maxLength={10} placeholder="Save your score ?" onChange={onChange} />    
                </div>
                <button className="btn btn-submit" onClick={() => onSubmit()}>Submit Ur Name</button>
            </>
        )

    return (
        <div className={modalClass}>
            <div className="modal-main">
                { isExceeded ? BestElem : NormalElem }

                {SubmitElem}

                <button className="btn btn-restart" onClick={() => closeModal('restart')}>Restart</button>
                <button className="btn btn-home" onClick={() => closeModal('home')}>Home</button>
            </div>
        </div>
    )
}

export default ResultModal