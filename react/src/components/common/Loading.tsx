/*
 * @Author: swancai
 * @Date: 2022-06-22 14:54:51
 * @LastEditors: tim.wen
 * @LastEditTime: 2022-06-30 18:19:15
 * @FilePath: /2048-react/react/src/components/common/Loading.tsx
 * @Description:
 */

import React from 'react';

import '@scss/loading.scss';

// interface ILoading {}

// const Loading: React.FC<ILoading> = (props) => {
const Loading: React.FC = () => {
  return (
    <div className="loading">
      <div className="main">
        <div className="particle particle_1">2</div>
        <div className="particle particle_2">0</div>
        <div className="particle particle_3">4</div>
        <div className="particle particle_4">8</div>
      </div>
    </div>
  );
};
export default Loading;
