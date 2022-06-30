/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-30 20:23:22
 * @LastEditors: tim.wen
 * @Description:
 * @FilePath: /2048-react/react/src/components/Game/ResultModal.tsx
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import axios, { formatFormUrlencoded } from '@utils/axios';

import Portal from '@components/common/Portal';
import Loading from '@components/common/Loading';
import ResultModalFirstPage from '@components/Game/ResultModalFirstPage';
import ResultModalSecondPage from '@components/Game/ResultModalSecondPage';

import { IRankItem, STORAGE_GAME_PLAYER } from '@utils/constants';
interface IPropsResultModal {
  isShow: boolean; // 是否展示
  bestScore: number; // 最高分
  score: number; // 当前分数
  timeSpent: number; // 总耗时（毫秒）
  onRestart: () => void; // 重新开始的方法
  onClose: () => void; // 关闭弹窗
}

/**
 * modal结果内容
 **/
const ResultModal: React.FC<IPropsResultModal> = (props) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [modalClass, setModalClass] = useState<string>('modal');
  const [scorer, setScorer] = useState<string>('');
  const [pageNum, setPageNum] = useState<number>(1); // 第几页
  const [isSubmit, setIsSubmit] = useState<boolean>(false); // 是否提交过
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [list, setList] = useState<IRankItem[]>([]);
  const [myInfo, setMyInfo] = useState<IRankItem>({
    id: -1, // id
    rank_num: 0, // 名词
    user_name: scorer, // 用户名
    user_score: props.score, // 得分
  });

  useEffect(() => {
    setModalClass(props.isShow ? 'modal show' : 'modal');
    const SScorer: string = localStorage.getItem(STORAGE_GAME_PLAYER) || '';
    if (props.isShow && SScorer) {
      setScorer(SScorer);
    }
  }, [props.isShow]);

  // 关闭弹窗
  const closeModal: (typeName: string) => void = (typeName) => {
    switch (typeName) {
      case 'restart': {
        props.onRestart();
        setModalClass('modal');
        // 因为离场动画需时0.5s，经调试离场顺滑程度，故延迟0.2s移除Dom
        setTimeout(() => {
          props.onClose();
        }, 200);
        break;
      }
      case 'home': {
        if (window.history && window.history.length > 1) {
          navigate(-1);
        } else {
          navigate('/', { replace: true });
        }
        break;
      }
    }
  };
  const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) =>
    setScorer(e.target.value);

  const onSubmit: () => void = () => {
    if (isLoading) return;
    if (!scorer) {
      setError(t('game_over.please_enter_your_name'));
      return;
    }
    if (error) {
      setError('');
    }

    setIsLoading(true);
    axios
      .post(
        '/query',
        formatFormUrlencoded({
          action: 'add',
          user_name: scorer,
          user_score: props.score,
          time_spent: props.timeSpent,
        })
      )
      .then((e) => {
        if (e.data && e.data.current_data) {
          setMyInfo(e.data.current_data);
          setList(e.data.rank_data);
          setIsLoading(false);
          setIsSubmit(true);
          setPageNum(2);
          localStorage.setItem(STORAGE_GAME_PLAYER, scorer);
        } else {
          throw new Error(t('error.response_is_error'));
        }
      })
      .catch((err) => {
        console.error('err=', err);
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <div className={modalClass}>
      <div className="modal-main">
        {isLoading ? (
          <Portal>
            <Loading />
          </Portal>
        ) : null}
        {pageNum === 1 ? (
          <ResultModalFirstPage
            inputVal={scorer}
            score={props.score}
            bestScore={props.bestScore}
            isError={Boolean(error)}
            onChange={onChange}
            onSubmit={onSubmit}
            onPageChange={(e) => setPageNum(e)}
          />
        ) : (
          <ResultModalSecondPage
            isSubmit={isSubmit}
            list={list}
            myInfo={myInfo}
            score={props.score}
            bestScore={props.bestScore}
            onClose={(e) => closeModal(e)}
          />
        )}
      </div>
    </div>
  );
};

export default ResultModal;
