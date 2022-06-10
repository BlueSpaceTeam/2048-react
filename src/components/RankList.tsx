/*
 * @Author: Swan Cai
 * @Date: 2022-06-06 14:48:00
 * @LastEditTime: 2022-06-08 22:17:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/RankList.tsx
 */
import React from 'react'
import RankItem from './RankItem'

import { IRankItem } from '../utils/constants'

import '../scss/RankList.scss'

interface IRankList {
    isShort?: boolean // 展示短样式
    list: IRankItem[]
}

/*
* 排名列表
*/
const RankList: React.FC<IRankList> = (props) => {
    const list: IRankItem[] = props.list
    const olClass: string[] = ['rank-list']
    if (props.isShort) {
        olClass.push('short')
    }
    return list.length 
        ? (
            <ol className={olClass.join(' ')}>
                {
                    list.map((obj: IRankItem) => {
                        return (
                            <RankItem 
                                key={obj.id}
                                position={obj.rank_num} 
                                name={obj.user_name}
                                score={obj.user_score}
                            />
                        )
                    })
                }
            </ol>
        ) 
        : <p className="no-data">暂无数据</p>

}
export default RankList