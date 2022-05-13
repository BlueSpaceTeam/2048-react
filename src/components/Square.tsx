import React from 'react'

// 求对数 Math.log(8)/Math.log(2) = 3 <=>  2**3 = 8

interface IPropSquare {
    num: number
}

/*
* 方块
* @prop num, 当前数值
*/
export default function Square (props: IPropSquare) {
    let numClass: string[] = ['number']
    if (props.num > 0) {
        // 更改字体大小
        const fsLen = props.num.toString().length
        let fsClass: string = 'fs-'
        if (fsLen <= 3) {
            fsClass += 3
        } else if (fsLen === 4) {
            fsClass += 4
        } else {
            fsClass += 5
        }

        // 每11个数轮回一次颜色序列
        const colorClass:string = `color-${Math.log(props.num) / Math.log(2) % 11}`

        numClass.push('show', fsClass, colorClass)
    }
    
    return (
        <div className="square">
          <div className={numClass.join(' ')}>{props.num}</div>
        </div>
    )
} 