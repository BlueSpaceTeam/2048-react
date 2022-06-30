/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-30 20:24:03
 * @LastEditors: tim.wen
 * @Description:
 * @FilePath: /2048-react/react/src/components/Game/ResultModalFirstPage.tsx
 */
import React from 'react';

import { useTranslation } from 'react-i18next';

import ResultLayout from '@components/Game/ResultLayout';

interface IPropsResultModal {
  inputVal: string; // 名字字符串
  bestScore: number; // 最高分
  score: number; // 当前分数
  isError: boolean; // 是否提交异常
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 名字改变
  onSubmit: () => void; // 提交名字
  onPageChange: (e: number) => void; // 更改页码
}

/**
 * modal第一页内容
 **/
const ResultModalFirstPage: React.FC<IPropsResultModal> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <ResultLayout score={props.score} bestScore={props.bestScore} />
      <div className="input-wrap">
        <input
          className="scorer"
          type="text"
          placeholder={t('game_over.enter_your_name')}
          maxLength={20}
          autoFocus
          value={props.inputVal}
          onChange={props.onChange}
        />
      </div>
      <button className="btn btn-submit" onClick={() => props.onSubmit()}>
        {t('game_over.save_record')}
      </button>
      {props.isError ? (
        <p className="error">{t('error.opps_something_wrong_please_try_again_later')}</p>
      ) : null}

      <button className="btn btn-no-submit" onClick={() => props.onPageChange(2)}>
        {t('game_over.no_thanks')}
      </button>
    </>
  );
};

export default ResultModalFirstPage;
