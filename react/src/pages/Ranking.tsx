/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-07-01 09:43:20
 * @LastEditors: fantiga
 * @Description:
 * @FilePath: /2048-react/react/src/pages/Ranking.tsx
 */

import { useEffect, useState } from 'react';
import axios, { formatFormUrlencoded } from '@utils/axios';
import { useTranslation } from 'react-i18next';

import RankList from '@components/common/RankList';
import Portal from '@components/common/Portal';
import Loading from '@components/common/Loading';

import { IRankItem } from '@utils/constants';

import '@scss/ranking.scss';

// interface IRanking {}

/* *
 * 排行榜
 **/
// const Ranking: React.FC<IRanking> = (props) => {
const Ranking: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [list, setList] = useState<IRankItem[]>([]);
  const controller = new AbortController();

  useEffect(() => {
    axios
      .post(
        '/query',
        formatFormUrlencoded({
          action: 'get',
        }),
        {
          signal: controller.signal,
        }
      )
      .then((e) => {
        if (e.data && Array.isArray(e.data.rank_data)) {
          setList(e.data.rank_data);
          setIsLoading(false);
        } else {
          throw new Error('response is error');
        }
      })
      .catch((err) => {
        console.error('err=', err);
        setIsLoading(false);
        setError(err);
      });

    return () => controller.abort();
  }, []);

  const ResUI: JSX.Element = error ? (
    <p className="error">Opps! Something wrong. Please try again later.</p>
  ) : (
    <RankList list={list} />
  );

  return (
    <div className="ranking">
      <h1 className="title">{t('ranking.ranking').toUpperCase()}</h1>

      {isLoading ? (
        <Portal>
          <Loading />
        </Portal>
      ) : (
        ResUI
      )}
    </div>
  );
};

export default Ranking;
