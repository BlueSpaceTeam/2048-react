/*
 * @Author: fantiga
 * @Date: 2022-06-30 16:25:56
 * @LastEditTime: 2022-07-01 15:42:42
 * @LastEditors: fantiga
 * @Description:
 * @FilePath: /2048-react/react/src/components/common/Languages.tsx
 */

import React from 'react';

import { useTranslation } from 'react-i18next';

import '@scss/languages.scss';

const Languages: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <section className="languages">
      <button onClick={() => i18n.changeLanguage('en_US')}>English</button>
      <button onClick={() => i18n.changeLanguage('zh_CN')}>简体中文</button>
      <button onClick={() => i18n.changeLanguage('zh_TW')}>繁體中文</button>
      <button onClick={() => i18n.changeLanguage('ja_JP')}>日本語</button>
    </section>
  );
};

export default Languages;
