import axios from 'axios'

axios.defaults.baseURL = '/query'

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