/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-24 10:01:05
 * @LastEditors: swancai
 * @Description: 
 * @FilePath: /2048-react/src/constants.ts
 */
// 判断不同设备移动触发游戏方块的最小值
export const MIN_DISTANCE_PC: number = 100
export const MIN_DISTANCE_M: number = 30

// 方块Row*Col矩阵常量
export const MATRIX_ROW: number = 4
export const MATRIX_COL: number = 4

// 方向类型
export type Direction = 'ArrowRight' | 'ArrowLeft' |'ArrowDown' | 'ArrowUp'
// 方向变量
export const RIGHT: Direction = 'ArrowRight'
export const LEFT: Direction = 'ArrowLeft'
export const DOWN: Direction = 'ArrowDown'
export const UP: Direction = 'ArrowUp'

// 接口返回的rankItem结构
export interface IRankItem {
    id: string | number // id
    rank_num: number // 排名
    user_name: string  // 用户名
    user_score: number // 得分
}

// 游戏历史 
export interface IAHistoryOfSquares {
	squares: number[] // 游戏方块位置及数值记录
    score: number // 本轮总得分
    randomNumIdx: number // 本轮随机出现数字的位置下标
}

// 游戏历史记录
export const STORAGE_GAME_HISTORY = 'game_history'
// 记录曾提交过的名字
export const STORAGE_GAME_PLAYER = 'game_player'
// 游戏最高分- 因项目已上线。这个已产生历史数据，不再改为下划线方式命名
export const STORAGE_BEST_SCORE = 'bestScore'