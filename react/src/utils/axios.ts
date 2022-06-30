/*
 * @Author: fantiga
 * @Date: 2022-06-14 09:49:54
 * @LastEditTime: 2022-06-30 18:27:27
 * @LastEditors: tim.wen
 * @Description:
 * @FilePath: /2048-react/react/src/utils/axios.ts
 */

import axios from 'axios';

axios.defaults.baseURL = 'http://2048.ued.team/server';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios;

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export function formatFormUrlencoded<T>(obj: Partial<T>): string {
  const res: string[] = [];
  for (const k in obj) {
    res.push(`${k}=${obj[k] || ''}`);
  }
  return res.join('&');
}
