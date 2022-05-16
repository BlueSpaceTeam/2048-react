import React from 'react'

interface IPropScore {
    name: string  // 分数名称
    num: number | string  // 当前数值
}

/*
* 分数
*/
export default function Score (props: IPropScore) {
    return (
        <div className="score">
          <span className="key">{props.name || ''}</span>
          <span>{props.num || 0}</span>
        </div>
    )
}