/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-30 20:08:35
 * @LastEditors: tim.wen
 * @Description:
 * @FilePath: /2048-react/react/src/pages/Home.tsx
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Languages from '@components/common/Languages';

import { useTranslation } from 'react-i18next';
import { STORAGE_GAME_HISTORY, IAHistoryOfSquares } from '@utils/constants';
import '@scss/home.scss';

// interface IHome {}

/* *
 * 首页
 * */
const Home: React.FC = () => {
  // const { t, i18n } = useTranslation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const StorageStr: string = localStorage.getItem(STORAGE_GAME_HISTORY) || '';
    if (StorageStr) {
      const SHistory: IAHistoryOfSquares[] = JSON.parse(StorageStr);
      if (SHistory.length > 1) {
        navigate('/game');
      }
    }
  }, []);

  return (
    <div className="home">
      <header>
        <h1 className="hd-l">Blue Space</h1>
        <div className="hd-r">
          <span className="square square_1">2</span>
          <span className="square square_2">0</span>
          <span className="square square_3">4</span>
          <span className="square square_4">8</span>
        </div>
      </header>

      <ul>
        <li>
          <button className="btn" onClick={() => navigate('/game')}>
            {t('home.play').toUpperCase()}
          </button>
        </li>
        <li>
          <button className="btn" onClick={() => navigate('/ranking')}>
            {t('home.ranking').toUpperCase()}
          </button>
        </li>
      </ul>

      <Languages />

      <footer>
        <p>
          <a className="link" href="https://github.com/BlueSpaceTeam/2048-react">
            README
          </a>
        </p>
        <p>
          <a className="link" href="https://github.com/BlueSpaceTeam">
            @BlueSpaceTeam
          </a>
          , since Apr 28, 2022.
        </p>
        <p>Written in React18 / Typescript / Python3 / SQLite3.</p>
      </footer>
    </div>
  );
};

export default Home;
