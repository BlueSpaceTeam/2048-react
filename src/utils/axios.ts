/*
 * @Author: fantiga
 * @Date: 2022-06-14 09:49:54
 * @LastEditTime: 2022-06-14 11:41:34
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/src/utils/axios.ts
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://2048.ued.team'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default axios

type Partial<T> = {
    [P in keyof T]?: T[P];
}

export function formatFormUrlencoded<T>(obj: Partial<T>): string {
    let res: string[] = []
    for (let k in obj) {
        res.push(`${k}=${obj[k]|| ''}`)
    }
    return res.join('&')
}