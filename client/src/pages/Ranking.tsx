/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime:2022-06-06 15:49:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/pages/Ranking.tsx
 */
import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'

import RankList from '../components/RankList'
import Modal from '../components/Modal'
import Loading from '../components/Loading'

import '../scss/ranking.scss'

interface IRankItem {
    id: string | number // id
    user_name: string  // 用户名
    user_score: number // 得分
    created_time: string // 创建时间
}

/* *
 * 排行榜
 * */ 
const Ranking: React.FC<{}> = ({}) => {
    // const list: IRankItem[] = ([
    //     {
    //         id: 1,
    //         user_name: '张飞',
    //         user_score: 12345678,
    //         created_time: '2022-12-30 12:56:54',
    //     },
    //     {
    //         id: 2,
    //         user_name: '张飞haahhhahahahhahah',
    //         user_score: 12348,
    //         created_time: 'just now',
    //     },
    //     {
    //         id: 3,
    //         user_name: '张飞haaahahhahah',
    //         user_score: 1234890900900900,
    //         created_time: '25 hours before',
    //     },
    //     {
    //         id: 4,
    //         user_name: '张飞hah',
    //         user_score: 900900,
    //         created_time: '56 min before',
    //     },
    //     {
    //         id: 5,
    //         user_name: '张飞hah',
    //         user_score: 900900,
    //         created_time: '2022-12-30',
    //     },
    //     {
    //         id: 6,
    //         user_name: '张飞hah',
    //         user_score: 900900,
    //         created_time: 'yesterday',
    //     },
    //     {
    //         id: 7,
    //         user_name: '张飞haaahahhahah',
    //         user_score: 1234890900900900,
    //         created_time: '25 hours before',
    //     },
    //     {
    //         id: 8,
    //         user_name: '张飞hah',
    //         user_score: 900900,
    //         created_time: '56 min before',
    //     },
    //     // {
    //     //     id: 9,
    //     //     user_name: '张飞hah',
    //     //     user_score: 900900,
    //     //     created_time: '2022-12-30',
    //     // },
    //     // {
    //     //     id: 10,
    //     //     user_name: '张飞hah',
    //     //     user_score: 900900,
    //     //     created_time: 'yesterday',
    //     // },
    //     // {
    //     //     id: 11,
    //     //     user_name: '张飞hah111111',
    //     //     user_score: 900900,
    //     //     created_time: 'yesterday',
    //     // },
    // ])

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    const [list, getList] = useState<IRankItem[]>([])

    useEffect(() => {
      axios.post('/query', {
        data: {
            action: 'get'
        }
      })
        .then(e => {
            console.log('e=', e)
            setIsLoading(false)
        })
        .catch(err => {
            console.error('err=', err)
            setIsLoading(false)
            setError(err)
        })  
    }, [])

    console.log(error)

    const ResUI: JSX.Element = error
        ? <p className="error">Opps! Something wrong. Please try again later.</p>
        : (
            true 
            ? <RankList list={list} />
            : <p className="no-data">Empty Data</p>
        )

    return (
        <div className="ranking">
            <h1 className="title">RANKING</h1>

            {
                isLoading 
                ? (
                    <Modal>
                        <Loading />
                    </Modal>
                )
                : ResUI
            }
        </div>
    )
}

export default Ranking