/*
 * @Author: tim.wen
 * @Date: 2022-06-28 16:15:55
 * @LastEditTime: 2022-06-30 18:03:43
 * @LastEditors: tim.wen
 * @Description: file content
 * @FilePath: /2048-react/react/src/components/Game/LogoButton.tsx
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { STORAGE_GAME_HISTORY } from '@utils/constants';

// interface ILogoButton {}

// const LogoButton: React.FC<ILogoButton> = (props) => {
const LogoButton: React.FC = () => {
  const navigate = useNavigate();
  // 返回首页
  const backHome: () => void = () => {
    localStorage.removeItem(STORAGE_GAME_HISTORY);
    if (window.history && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };
  return (
    <button className="logo" onClick={() => backHome()}>
      2048
    </button>
  );
};

export default LogoButton;
