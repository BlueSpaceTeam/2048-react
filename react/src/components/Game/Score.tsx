/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-28 11:31:08
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/react/src/components/Game/Score.tsx
 */
import React from 'react';

import { useTranslation } from 'react-i18next';

interface IPropScore {
    name: string;  // 分数名称
    num: number | string;  // 当前数值
}

/*
* 分数
*/
const Score: React.FC<IPropScore> = (props) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="score">
            <span className="key">{t(props.name.toLowerCase()).toUpperCase() || ''}</span>
            <span>{props.num || 0}</span>
        </div>
    );
};

export default Score;