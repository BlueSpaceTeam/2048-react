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