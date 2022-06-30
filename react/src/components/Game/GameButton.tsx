/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-30 19:19:25
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/react/src/components/Game/GameButton.tsx
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
interface IPropGameButton {
    name: string; // 按钮名称
    btnDisabled?: boolean; // 按钮是否可用
    onClick: () => void; // 点击事件
}

/*
* 游戏按钮
*/
const GameButton: React.FC<IPropGameButton> = (props) => {
    const { t, i18n } = useTranslation();
    const classStr: string = `btn btn-${props.name.toLowerCase()} ${props.btnDisabled ? 'disabled' : ''}`;
    return (
        /**
         * TODO：按钮文案和样式分离
         * 分离后（供参考）：t('game.new').toUpperCase()
         * 分离后（供参考）：t('game.undo').toUpperCase()
         * 分离后（供参考）：t('game.unmuted').toUpperCase()
         * 分离后（供参考）：t('game.muted').toUpperCase()
         */
        <button className={classStr} onClick={props.onClick}>{t(props.name.toLowerCase()).toUpperCase()}</button>
    );
};

export default GameButton;