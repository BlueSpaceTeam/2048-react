/*
 * @Author: fantiga
 * @Date: 2022-05-27 17:55:03
 * @LastEditTime: 2022-06-30 18:27:54
 * @LastEditors: tim.wen
 * @Description:
 * @FilePath: /2048-react/react/src/utils/hooks.tsx
 */

import { useEffect, useRef } from 'react';

// 自定义hook： 获取旧值
export const usePrevious = <T extends number>(value: T): number => {
  const ref = useRef<number>(0);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
