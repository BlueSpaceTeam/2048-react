import React from 'react'

interface PropScore {
    name: string,
    num: number | string
}

/*
* 方块
* @prop num, 当前数值
*/
export default function Score (props: PropScore) {
    return (
        <div className="score">
          <span className="key">{props.name || ''}</span>
          <span>{props.num || 0}</span>
        </div>
    )
}