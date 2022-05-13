import React from 'react'

interface IPropScore {
    name: string,
    num: number | string
}

/*
* 方块
* @prop num, 当前数值
*/
export default function Score (props: IPropScore) {
    return (
        <div className="score">
          <span className="key">{props.name || ''}</span>
          <span>{props.num || 0}</span>
        </div>
    )
}