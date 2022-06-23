/*
 * @Author: fantiga
 * @Date: 2022-06-23 16:16:50
 * @LastEditTime: 2022-06-23 18:36:59
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/react/src/utils/timer.tsx
 */

const getNow = () => {
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime()
        }
    }

    return Date.now()
}


export const startTimeDiff = (): void => {
    const timer: number = getNow()
    // console.log('timer', timer)
    // console.log('timer')
    sessionStorage.setItem('timer', String(timer))
}

export const endTimeDiff = (): number => {
    let timer: number | null = Number(sessionStorage.getItem('timer'))

    timer = getNow() - timer
    // console.log('Date.now()', getNow(), timer)

    sessionStorage.removeItem('timer')

    return timer
}