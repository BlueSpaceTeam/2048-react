/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-26 08:54:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/pages/Ranking.tsx
 */
import React from 'react'

import RankItem from '../components/RankItem'

import '../scss/ranking.scss'

interface IRankItem {
    id: string // id
    name: string  // 用户名
    score: number // 得分
}
interface IRankingList {
    map: Function
    [index: number]: IRankItem
    length: number
}

/* *
 * 排行榜
 * */ 
const Ranking: React.FC<{}> = ({}) => {
    const list = ([
        {
            id: 1,
            name: '张飞',
            score: 12345678,
        },
        {
            id: 2,
            name: '张飞haahhhahahahhahah',
            score: 12348,
        },
        {
            id: 3,
            name: '张飞haaahahhahah',
            score: 1234890900900900,
        },
        {
            id: 4,
            name: '张飞hah',
            score: 900900,
        },
    ]) as unknown as IRankingList

    return (
        <div className="ranking">
            <h1 className="title">RANKING</h1>
            <ol className="container">
                {
                    list.map((obj: IRankItem, idx: number) => {
                        return (
                            <RankItem 
                                key={obj.id}
                                position={idx + 1} 
                                name={obj.name}
                                score={obj.score}
                            />
                        )
                    })
                }
            </ol>
        </div>
    )
}

export default Ranking