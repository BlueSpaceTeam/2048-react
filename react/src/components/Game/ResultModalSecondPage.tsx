/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-07-01 09:38:38
 * @LastEditors: fantiga
 * @Description:
 * @FilePath: /2048-react/react/src/components/Game/ResultModalSecondPage.tsx
 */

import React from 'react';

import { useTranslation } from 'react-i18next';

import RankList from '@components/common/RankList';
import ResultLayout from '@components/Game/ResultLayout';

import { IRankItem } from '@utils/constants';

interface IPropsResultModal {
  isSubmit: boolean; // 是否提交记录者名称
  list: IRankItem[]; // 历史记录
  myInfo: IRankItem; // 本次游戏记录
  bestScore: number; // 最高分
  score: number; // 当前分数
  onClose: (type: string) => void; // 关闭弹窗
}

/**
 * modal第一页内容
 **/
const ResultModalSecondPage: React.FC<IPropsResultModal> = (props) => {
  const { t } = useTranslation();
  const RankUI: JSX.Element = (
    <>
      <div className="my-rank">
        <span className="position blue">{props.myInfo.rank_num || 0}</span>
        <span className="name">{props.myInfo.user_name || '-'}</span>
        <span className="score">{(props.myInfo.user_score || 0).toLocaleString()}</span>
        <span className="flag blue">{t('game_over.yours')}</span>
      </div>
      <RankList list={props.list} isShort />
    </>
  );
  return (
    <>
      {props.isSubmit ? (
        RankUI
      ) : (
        <ResultLayout score={props.score} bestScore={props.bestScore} />
      )}
      <button className="btn btn-restart" onClick={() => props.onClose('restart')}>
        {t('game_over.play_again')}
      </button>
      <button className="btn btn-home" onClick={() => props.onClose('home')}>
        {t('game_over.home')}
      </button>
    </>
  );
};

export default ResultModalSecondPage;
