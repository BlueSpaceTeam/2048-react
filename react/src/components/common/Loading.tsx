/*
 * @Author: swancai
 * @Date: 2022-06-22 14:54:51
 * @LastEditors: swancai
 * @LastEditTime: 2022-06-24 17:34:11
 * @FilePath: \zjgp_zjhye:\job\ts\2048-react\react\src\components\common\Loading.tsx
 * @Description: 
 */
import React from 'react'

import '@scss/loading.scss'

interface ILoading {}

const Loading: React.FC<ILoading> = (props) => {
    return (
        <div className="loading">
            <div className="main">
                <div className="particle particle_1">2</div>
                <div className="particle particle_2">0</div>
                <div className="particle particle_3">4</div>
                <div className="particle particle_4">8</div>
            </div>
        </div>
    )
}
export default Loading