/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-07-01 19:28:54
 * @LastEditors: fantiga
 * @Description:
 * @FilePath: /2048-react/react/src/pages/Home.tsx
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Languages from '@components/common/Languages';

import { useTranslation } from 'react-i18next';
import { STORAGE_GAME_HISTORY, IAHistoryOfSquares } from '@utils/constants';
import '@scss/home.scss';

/* *
 * 首页
 * */
const Home: React.FC = () => {
  // const [language, setLanguage] = useState<string>('en_US');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [showContinue, setShowConitinue] = useState<boolean>(false);

  useEffect(() => {
    const StorageStr: string = localStorage.getItem(STORAGE_GAME_HISTORY) || '';
    if (StorageStr) {
      const SHistory: IAHistoryOfSquares[] = JSON.parse(StorageStr);
      if (SHistory.length > 1) {
        setShowConitinue(true);
      }
    }
  }, []);

  // 自动判断用户语言
  useEffect(() => {
    const user_lang: string = navigator.language;
    switch (user_lang) {
      case 'en-US': // 英语-美国
      case 'en-AU': // 英语-澳洲
      case 'en-BZ': // 英语-伯利兹
      case 'en-CA': // 英语-加拿大
      case 'en-CB': // 英语-加勒比海
      case 'en-IE': // 英语-爱尔兰
      case 'en-JM': // 英语-牙买加
      case 'en-NZ': // 英语-新西兰
      case 'en-PH': // 英语-菲律宾
      case 'en-ZA': // 英语-南非
      case 'en-TT': // 英语-特立尼达和多巴哥
      case 'en-GB': // 英语-英国
      case 'en-ZW': // 英语-津巴布韦
      case 'en': // 英语
        i18n.changeLanguage('en_US');
        break;
      case 'zh-CN': // 简体中文-中国大陆
      case 'zh-SG': // 简体中文-新加坡
      case 'zh-CHS': // 简体中文
        i18n.changeLanguage('zh_CN');
        break;
      case 'zh-TW': // 繁体中文-台湾
      case 'zh-HK': // 繁体中文-香港
      case 'zh-MO': // 繁体中文-澳门
      case 'zh-CHT': // 繁体中文
        i18n.changeLanguage('zh_TW');
        break;
      case 'ja-JP': // 日语-日本
      case 'ja': // 日语
        i18n.changeLanguage('ja_JP');
        break;
      default:
        i18n.changeLanguage('en_US');
        break;
    }
  }, []);

  // 开始新游戏
  const startGame: () => void = () => {
    localStorage.removeItem(STORAGE_GAME_HISTORY);
    navigate('/game');
  };

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
        {showContinue ? (
          <li>
            <button className="btn" onClick={() => navigate('/game')}>
              {t('home.continue')}
            </button>
          </li>
        ) : null}
        <li>
          <button className="btn" onClick={() => startGame()}>
            {t('home.play')}
          </button>
        </li>
        <li>
          <button className="btn" onClick={() => navigate('/ranking')}>
            {t('home.ranking')}
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
