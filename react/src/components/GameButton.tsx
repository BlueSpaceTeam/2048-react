/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-21 16:41:07
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/client/src/components/GameButton.tsx
 */
import React from 'react'

interface IPropGameButton {
    name: string // 按钮名称
    btnDisabled?: boolean // 按钮是否可用
    onClick: () => void // 点击事件
}

/*
* 游戏按钮
*/
const GameButton: React.FC<IPropGameButton> = (props) => {
    const classStr: string = `btn btn-${props.name.toLowerCase()} ${props.btnDisabled ? 'disabled' : ''}`
    return (
        <button className={classStr} onClick={props.onClick}>{ props.name.toUpperCase() }</button>
    )
}

export default GameButton