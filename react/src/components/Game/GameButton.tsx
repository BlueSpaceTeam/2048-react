/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-07-01 09:48:27
 * @LastEditors: swancai
 * @Description:
 * @FilePath: \zjgp_zjhye:\job\ts\2048-react\react\src\components\Game\GameButton.tsx
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
interface IPropGameButton {
  name: string; // 按钮名称
  className?: string; // 自定义样式类名
  btnDisabled?: boolean; // 按钮是否可用
  onClick: () => void; // 点击事件
}

/*
 * 游戏按钮
 */
const GameButton: React.FC<IPropGameButton> = (props) => {
  const { t, i18n } = useTranslation();
  const classStr = `btn ${props.className || ''} ${
    props.btnDisabled ? 'disabled' : ''
  }`;
  return (
    <button className={classStr} onClick={props.onClick}>
      {t(props.name) || ''}
    </button>
  );
};

export default GameButton;
