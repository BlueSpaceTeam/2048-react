/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime:2022-06-06 15:49:00
 * @LastEditors: swancai
 * @Description: 
 * @FilePath: /2048-react/src/components/Score.tsx
 */
import React from 'react'

interface IPropRankItem {
    position: number // 名次
    name: string  // 用户名
    score: number // 得分
}

/*
* 排名项
*/
const RankItem: React.FC<IPropRankItem> = (props) => {
    const positionClass: string[] = ['position']
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

    return (
        <li className="rank-item">
            <span className={positionClass.join(' ')}>{props.position || 0}</span>
            <span className="name">{props.name || '-'}</span>
            <span className="score">{(props.score || 0).toLocaleString()}</span>
        </li>
    )
}

export default RankItem