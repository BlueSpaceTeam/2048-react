/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime:2022-06-06 15:49:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/ResultModal.tsx
 */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ResultLayout from './ResultLayout'
import RankList from './RankList'

// TODEL
interface IRankItem {
    id: string | number // id
    user_name: string  // 用户名
    user_score: number // 得分
    created_time: string // 创建时间
}
const list: IRankItem[] = ([
    {
        id: 1,
        user_name: '张飞',
        user_score: 12345678,
        created_time: '2022-12-30 12:56:54',
    },
    {
        id: 2,
        user_name: '张飞haahhhahahahhahah',
        user_score: 12348,
        created_time: 'just now',
    },
    {
        id: 3,
        user_name: '张飞haaahahhahah',
        user_score: 1234890900900900,
        created_time: '25 hours before',
    },
    {
        id: 4,
        user_name: '张飞hah',
        user_score: 900900,
        created_time: '56 min before',
    },
    {
        id: 5,
        user_name: '张飞hah',
        user_score: 900900,
        created_time: '2022-12-30',
    },
    {
        id: 6,
        user_name: '张飞hah',
        user_score: 900900,
        created_time: 'yesterday',
    },
    {
        id: 7,
        user_name: '张飞haaahahhahah',
        user_score: 1234890900900900,
        created_time: '25 hours before',
    },
    {
        id: 8,
        user_name: '张飞hah',
        user_score: 900900,
        created_time: '56 min before',
    },
    // {
    //     id: 9,
    //     user_name: '张飞hah',
    //     user_score: 900900,
    //     created_time: '2022-12-30',
    // },
    // {
    //     id: 10,
    //     user_name: '张飞hah',
    //     user_score: 900900,
    //     created_time: 'yesterday',
    // },
    // {
    //     id: 11,
    //     user_name: '张飞hah111111',
    //     user_score: 900900,
    //     created_time: 'yesterday',
    // },
])


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
    const [pageNum, setPageNum] = useState<number>(1) // 第几页
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
    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => setScorer(e.target.value)

    const onSubmit: () => void = () => {
        setIsSubmit(true)
        setPageNum(2)
    }


    const FirstPage: JSX.Element = (
        <>
            <ResultLayout score={props.score} bestScore={props.bestScore} />
            <div className="input-wrap">
                <input 
                    className="scorer" 
                    type="text" 
                    placeholder="Save your score ?" 
                    maxLength={10} 
                    onChange={onChange} 
                />    
            </div>
            <button className="btn btn-submit" onClick={() => onSubmit()}>Submit Ur Name</button>
            <button className="btn btn-no-submit" onClick={() => setPageNum(2)}>No, thanks</button>
        </>
    )

    const myInfo: IRankItem = {
        id: -1, // id
        user_name: scorer, // 用户名
        user_score: props.score, // 得分
        created_time:  '' // 创建时间- TODO
    }
    const SecondPage: JSX.Element = (
        <>
            {
                isSubmit
                    ? <RankList list={list} myInfo={myInfo} />
                    : <ResultLayout score={props.score} bestScore={props.bestScore} />
            }
            <button className="btn btn-restart" onClick={() => closeModal('restart')}>Restart</button>
            <button className="btn btn-home" onClick={() => closeModal('home')}>Home</button>
        </>   
    )

    return (
        <div className={modalClass}>
            <div className="modal-main">
                { pageNum === 1 ? FirstPage : SecondPage }   
            </div>
        </div>
    )
}

export default ResultModal