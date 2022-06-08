/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime:2022-06-06 15:49:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/Score.tsx
 */
import React from 'react'

interface IPropRankItem {
    isYours?: boolean // 是否展示自己的排名
    position: number // 名次
    name: string  // 用户名
    score: number // 得分
    time: string // 时间
}

/*
* 排名项
*/
const RankItem: React.FC<IPropRankItem> = (props) => {
    const positionClass: string[] = ['position']
    let rankItemClass: string = 'rank-item'
    let timeClass: string[] = ['time']

    switch (props.position) {
        case 1: {
            positionClass.push('first')
            break
        }
        case 2: {
            positionClass.push('second')
            break
        }
        case 3: {
            positionClass.push('third')
            break
        }
    }

    let timePlaceStr: string = props.time ? props.time.slice(0, 16) : '-'
    if (props.isYours) {
        timePlaceStr = 'Yours'
        rankItemClass += ' mine'
        positionClass.push('txt')
        timeClass.push('txt')
    }
    return (
        <li className={rankItemClass}>
            <span className={positionClass.join(' ')}>{props.position || 0}</span>
            <span className="name">{props.name || '-'}</span>
            <span className="score">{props.score || 0}</span>
            <span className={timeClass.join(' ')}>{timePlaceStr}</span>
        </li>
    )
}

export default RankItem