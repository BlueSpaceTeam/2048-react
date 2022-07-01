/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-07-01 09:30:30
 * @LastEditors: fantiga
 * @Description:
 * @FilePath: /2048-react/react/src/components/Game/ResultLayout.tsx
 */

import React from 'react';

import { useTranslation } from 'react-i18next';

interface IResultLayout {
  bestScore: number; // 最高分
  score: number; // 当前分数
}

const ResultLayout: React.FC<IResultLayout> = (props) => {
  const { t } = useTranslation();
  // 是否现得分数超越过去最高分 展示不同的结果
  return props.score > props.bestScore ? (
    <>
      <h1 className="title exceed">{t('game_over.congratulations')}</h1>
      <div className="p-score">
        {t('game_over.you_has_got_a_best_score')}{' '}
        <span className="num cur best">{props.score || 0}</span>
      </div>
    </>
  ) : (
    <>
      <h1 className="title">{t('game_over.game_over')}</h1>
      <div className="p-score">
        {t('game_over.current_score')}
        <span className="num cur">{(props.score || 0).toLocaleString()}</span>
      </div>
      <div className="p-score best">
        {t('game_over.best_score')}
        <span className="num">{(props.bestScore || 0).toLocaleString()}</span>
      </div>
    </>
  );
};

export default ResultLayout;
