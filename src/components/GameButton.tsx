import React from 'react'

interface IPropGameButton {
    name: string,
    btnDisabled?: boolean
    onClick: () => void
}

/*
* 方块
* @prop num, 当前数值
*/
export default function GameButton (props: IPropGameButton) {
    const classStr: string = `btn btn-${props.name.toLowerCase()} ${props.btnDisabled ? 'disabled' : ''}`
    return (
        <button className={classStr} onClick={props.onClick}>{ props.name.toUpperCase() }</button>
    )
}