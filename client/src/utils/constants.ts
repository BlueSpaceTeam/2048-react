/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-24 16:58:00
 * @LastEditors: Swan Cai
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

export interface IAHistoryOfSquares {
	squares: number[]
}

// 游戏历史记录
export const STORAGE_GAME_HISTORY = 'game_history'
// 游戏分数记录
export const STORAGE_GAME_SCORES = 'game_scores'
// 记录曾提交过的名字
export const STORAGE_GAME_PLAYER = 'game_player'
// 游戏最高分
export const STORAGE_BEST_SCORE = 'bestScore'