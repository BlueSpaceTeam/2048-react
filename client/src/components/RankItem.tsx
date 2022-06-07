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
    position: number // 名次， 当名次值为-1，认为是特殊展示：展示自己的排名
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

    switch (props.position) {
        case -1: {
            rankItemClass += ' mine'
            positionClass.push('txt')
            break
        }
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

    return (
        <li className={rankItemClass}>
            <span className={positionClass.join(' ')}>{props.position === -1? 'Yours' : (props.position || 0)}</span>
            <span className="name">{props.name || '-'}</span>
            <span className="score">{props.score || 0}</span>
            <span className="time">{props.time ? props.time.slice(0, 16) : '-'}</span>
        </li>
    )
}

export default RankItem