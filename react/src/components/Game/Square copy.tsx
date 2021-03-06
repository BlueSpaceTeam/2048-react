/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-30 18:13:12
 * @LastEditors: tim.wen
 * @Description:
 * @FilePath: /2048-react/react/src/components/Game/Square copy.tsx
 */

import React from 'react';

// 求对数 Math.log(8)/Math.log(2) = 3 <=>  2**3 = 8

interface IPropSquare {
  num: number; // 当前数值
}

/*
 * 方块
 */
const Square: React.FC<IPropSquare> = (props) => {
  const numClass: string[] = ['number'];
  if (props.num > 0) {
    // 更改字体大小
    const fsLen = props.num.toString().length;
    let fsClass = 'fs-';
    if (fsLen <= 3) {
      fsClass += 3;
    } else if (fsLen === 4) {
      fsClass += 4;
    } else {
      fsClass += 5;
    }

    // 每11个数轮回一次颜色序列
    const colorClass = `color-${(Math.log(props.num) / Math.log(2)) % 11}`;

    numClass.push('show', fsClass, colorClass);
  }

  return (
    <div className="square">
      <div className={numClass.join(' ')}>{props.num}</div>
    </div>
  );
};

export default Square;
