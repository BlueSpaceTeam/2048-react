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
    list: IRankItem[]
    myInfo?: IRankItem
}

/*
* 排名列表
*/
const RankList: React.FC<IRankList> = (props) => {
    const list: IRankItem[] = props.list
    const rankWrapClass = `rank-wrap ${ props.myInfo ? 'mine' : '' }`
    return (
        <div className="rank-list">
            {
                props.myInfo 
                    ? (
                        <RankItem 
                            key={'mine'}
                            isYours
                            position={props.myInfo.rank_num} 
                            name={props.myInfo.user_name}
                            score={props.myInfo.user_score}
                            time={props.myInfo.created_time}
                        />
                    ) : null
            }
            <ol className={rankWrapClass}>
                {
                    list.length 
                        ? list.map((obj: IRankItem) => {
                            return (
                                <RankItem 
                                    key={obj.id}
                                    position={obj.rank_num} 
                                    name={obj.user_name}
                                    score={obj.user_score}
                                    time={obj.created_time}
                                />
                            )
                        })
                        : '暂无数据'
                }
            </ol>
        </div>
    )
}
export default RankList