import React from 'react'

interface IPropGameButton {
    name: string // 按钮名称
    btnDisabled?: boolean // 按钮是否可用
    onClick: () => void // 点击事件
}

/*
* 游戏按钮
*/
export default function GameButton (props: IPropGameButton) {
    const classStr: string = `btn btn-${props.name.toLowerCase()} ${props.btnDisabled ? 'disabled' : ''}`
    return (
        <button className={classStr} onClick={props.onClick}>{ props.name.toUpperCase() }</button>
    )
}