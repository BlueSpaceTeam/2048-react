/*
 * @Author: fantiga
 * @Date: 2022-06-23 16:16:50
 * @LastEditTime: 2022-06-24 12:18:30
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/react/src/utils/timer.tsx
 */

/**
 * @name: getNow
 * @description: 用Date.now()生成一个当前时间的Unix时间戳。该方法在 ECMA-262 第五版中被标准化，更早的浏览器引擎如果不支持，可以通过Date().getTime()来兼容。
 * @return {*}
 */
const getNow = (): number => {
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }
    return Date.now();
};

/**
 * @name: startTimeDiff
 * @description: 开始时间差计算。生成一个当前时间的Unix时间戳，写入sessionStorage中。
 * @return {*}
 */
export const startTimeDiff = (): void => sessionStorage.setItem('timer', String(getNow()));

/**
 * @name: endTimeDiff
 * @description: 结束时间差计算。生成一个当前时间的Unix时间戳，并与sessionStorage中已有的时间戳相减，得出总耗时。单位毫秒。
 * @return {*} number   总耗时
 */
export const endTimeDiff = (): number => {
    let timer: number | null = Number(sessionStorage.getItem('timer'));
    timer = getNow() - timer;
    sessionStorage.removeItem('timer');
    return timer;
};