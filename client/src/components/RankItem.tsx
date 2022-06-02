/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-26 08:52:00
 * @LastEditors: Swan Cai
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
    return (
        <li className="rank-item">
            <span className="position">{props.position || 0}</span>
            <span className="name">{props.name || '-'}</span>
            <span className="score">{props.score || 0}</span>
        </li>
    )
}

export default RankItem