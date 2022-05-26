/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-26 08:52:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/Score.tsx
 */
import React from 'react'

interface IPropScore {
    name: string  // 分数名称
    num: number | string  // 当前数值
}

/*
* 分数
*/
const Score: React.FC<IPropScore> = (props) => {
    return (
        <div className="score">
          <span className="key">{props.name || ''}</span>
          <span>{props.num || 0}</span>
        </div>
    )
}

export default Score