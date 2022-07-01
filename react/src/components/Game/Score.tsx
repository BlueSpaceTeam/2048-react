/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-07-01 12:36:11
 * @LastEditors: fantiga
 * @Description:
 * @FilePath: /2048-react/react/src/components/Game/Score.tsx
 */

import React from 'react';

import { useTranslation } from 'react-i18next';

interface IPropScore {
  name: string; // 分数名称
  num: number | string; // 当前数值
}

/*
 * 分数
 */
const Score: React.FC<IPropScore> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="score">
      <span className="key">{t(props.name).toUpperCase() || ''}</span>
      <span>{props.num || 0}</span>
    </div>
  );
};

export default Score;
