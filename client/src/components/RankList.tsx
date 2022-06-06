/*
 * @Author: Swan Cai
 * @Date: 2022-06-06 14:48:00
 * @LastEditTime: 2022-06-06 14:48:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/RankList.tsx
 */
import React from 'react'
import RankItem from './RankItem'
import './RankList.scss'

interface IRankItem {
    id: string | number // id
    user_name: string  // 用户名
    user_score: number // 得分
    created_time: string // 创建时间
}

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
                            position={-1} 
                            name={props.myInfo.user_name}
                            score={props.myInfo.user_score}
                            time={props.myInfo.created_time}
                        />
                    ) : null
            }
            <ol className={rankWrapClass}>
                {
                    list.map((obj: IRankItem, idx: number) => {
                        return (
                            <RankItem 
                                key={obj.id}
                                position={idx + 1} 
                                name={obj.user_name}
                                score={obj.user_score}
                                time={obj.created_time}
                            />
                        )
                    })
                }
            </ol>
        </div>
    )
}
export default RankList