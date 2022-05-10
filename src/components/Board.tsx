import React, { useState, useEffect, useRef } from 'react'
import Square from './Square'


// 判断不同设备移动触发游戏方块的最小值
const MIN_DISTANCE_PC: number = 100
const MIN_DISTANCE_M: number = 30

// 方块M*N矩阵常量
const MATRIX_ROW: number = 4
const MATRIX_COL: number = 4

// 方向类型
type Direction = 'ArrowRight' | 'ArrowLeft' |'ArrowDown' | 'ArrowUp'
// 方向变量
const RIGHT: Direction = 'ArrowRight'
const LEFT: Direction = 'ArrowLeft'
const DOWN: Direction = 'ArrowDown'
const UP: Direction = 'ArrowUp'

export default function Board (props: any) {
    const [squares, setSequares] = useState(new Array(16).fill(0))

	let coordinate = {
		X: 0,
		Y: 0
	}

    const SquaresUI: JSX.Element[] = squares.map((n, idx) => {
      return <Square num={n} key={idx} />
    })

	// 获取方向
	function getDirection (curX: number, curY: number, minDistance: number) : Direction | null {
		// 判断方向
		const deltaX: number = curX - coordinate.X
		const deltaY: number = curY - coordinate.Y

		const absDeltaX = Math.abs(deltaX)
		const absDeltaY = Math.abs(deltaY)

		// 定义鼠标移动不小于100，才认为是要操作，避免过敏误操作界面
		if (absDeltaX < minDistance && absDeltaY < minDistance) return null
		
		// delta正值，认为是↓ 或 →，否则是↑ 或 ←
		const dirX: Direction = deltaX > 0 ? RIGHT : LEFT
		const dirY: Direction = deltaY > 0 ? DOWN : UP
		const deltaDir: number = absDeltaX - absDeltaY
		let direction: Direction
		if (deltaDir > 0) { // 如果deltaX - deltaY > 0 ,认为 往→ 或 ←
			direction = dirX
		} else if (deltaDir < 0) {  // 如果deltaX - deltaY < 0 ,认为 往↓ 或 ↑
			direction = dirY
		} else {// 如果deltaX - deltaY = 0, 随机上下 或 左右
			direction = Math.round(Math.random()) ? dirX : dirY
		}

		// reset
		coordinate.X = 0
		coordinate.Y = 0

		return direction
	}
	// 当前格对应一元数组的下标
	// function getSequareIdx (row: number, col: number): number {
	// 	return (row - 1) * MATRIX_COL + (col - 1)	
	// }
	// 当前格对应一元数组的下标 —— 函数式编程
	const getSequareIdx: (row: number, col: number) => number = (row, col) => (row - 1) * MATRIX_COL + (col - 1)

	type dir = Direction

	// 触摸事件
	function handleTouchStart (e: any) {
		console.log('handleTouchStart', e)
		coordinate.X = e.touches[0].clientX
		coordinate.Y = e.touches[0].clientY
	}
	function handleTouchEnd (e: any) {
		console.log('handleTouchEnd', e)
		const direction: Direction | null = getDirection(e.touches[0].clientX, e.touches[0].clientY, MIN_DISTANCE_M)
		if (direction) {
			handleMove(direction)
		}
	}

	// 鼠标事件
	function handleMouseDown (e: any) {
		console.log('handleMouseDown', e, e.clientX, e.clientY)

		coordinate.X = e.clientX
		coordinate.Y = e.clientY
	}
	function handleMouseUp (e: any) {
		// 不在区域内，不执行后续代码
		if (!coordinate.X && !coordinate.Y) return

		const direction: Direction | null = getDirection(e.clientX, e.clientY, MIN_DISTANCE_PC)
		console.log('handleMouseUp', e, e.clientX, e.clientY, direction)
		if (direction) {
			handleMove(direction)
		}
	}

	// 键盘事件
	function handleKeyUp (e: any) {
		console.log('handleKeyUp', e)
		switch (e.code) {
			case UP :
			case RIGHT :
			case DOWN :
			case LEFT : {
				const direction: Direction = e.code
				if (direction) {
					handleMove(direction)
				}
				break
			}
		}
	}
	document.onkeyup = handleKeyUp

	/**
	 * 移动处理
	 * 
	 **/
	function handleMove (direction: Direction): void {
		const arr = squares.slice()
		switch (direction) {
			case UP : {
				if (MATRIX_ROW > 1) {
					// 从第1列开始
					for (let col: number = 1; col <= MATRIX_COL; col++) {
						// 最后一个下标序号
						// const preEndIdx: number = col - 1
						const preEndIdx: number = getSequareIdx(1, col)
						// 每行和前一行的下标相差值
						const rowIdxDelta: number = MATRIX_COL
						// 从第2行开始往移动方向合并
						for (let row: number = 2; row <= MATRIX_ROW; row++) {
							// 每行开始值对应一元数组的下标
							const curRowIdx: number = getSequareIdx(row, col)
							if (arr[curRowIdx]) { // 当前行有值的情况
								console.log(`col=${col}, row=${row}, squaresIdx=${curRowIdx}`)
								// preRowIdx ：移动方向的前一行Idx
								for (let preRowIdx: number = getSequareIdx(row - 1, col); preRowIdx >= preEndIdx; preRowIdx -= rowIdxDelta) {
									if (arr[preRowIdx]) {
										if (arr[curRowIdx] === arr[preRowIdx]) { // 合并
											arr[preRowIdx] *= 2
											arr[curRowIdx] = 0
										} else if ((curRowIdx - preRowIdx) / rowIdxDelta > 1) { // curRowIdx - preRowIdx 之间有空格，则放置离lastRowIdx最近一格
											arr[preRowIdx + rowIdxDelta] = arr[curRowIdx]
											arr[curRowIdx] = 0
										}
										break
									} else if (!arr[preRowIdx] && preRowIdx === preEndIdx) { // 往移动方向进方向，如果到达头部，则放置于此
										arr[preRowIdx] = arr[curRowIdx]
										arr[curRowIdx] = 0
									}
									// 继续往移动方向进方向寻找
								}
							}
						}	
					}
				}
				break
			}
			case DOWN : {
				// 从倒数第2行开始往移动方向合并
				if (MATRIX_ROW > 1) {
					// 从第1列开始
					for (let col: number = 1; col <= MATRIX_COL; col++) {
						// 最后一个下标序号
						const preEndIdx: number = getSequareIdx(MATRIX_ROW, col)
						// 每行和前一行的下标相差值
						const rowIdxDelta: number = MATRIX_COL
						// 从倒数第2行开始往移动方向合并
						for (let row: number = MATRIX_ROW - 1; row >= 1; row--) {
							// 每行开始值对应一元数组的下标
							const curRowIdx: number = getSequareIdx(row, col)
							if (arr[curRowIdx]) { // 当前行有值的情况
								console.log(`col=${col}, row=${row}, squaresIdx=${curRowIdx}`)
								// preRowIdx ：移动方向的前一行Idx
								for (let preRowIdx: number = getSequareIdx(row + 1, col); preRowIdx <= preEndIdx; preRowIdx += rowIdxDelta) {
									if (arr[preRowIdx]) {
										if (arr[curRowIdx] === arr[preRowIdx]) { // 合并
											arr[preRowIdx] *= 2
											arr[curRowIdx] = 0
										} else if ((preRowIdx - curRowIdx) / rowIdxDelta > 1) { // curRowIdx - preRowIdx 之间有空格，则放置离lastRowIdx最近一格
											arr[preRowIdx - rowIdxDelta] = arr[curRowIdx]
											arr[curRowIdx] = 0
										}
										break
									} else if (!arr[preRowIdx] && preRowIdx === preEndIdx) { // 往移动方向进方向找，如果到达头部，则放置于此
										arr[preRowIdx] = arr[curRowIdx]
										arr[curRowIdx] = 0
									}
									// 继续往移动方向进方向寻找
								}
							}
						}	
					}
				}
				break
			}
			case LEFT : {
				// 从第2列开始往移动方向合并
				if (MATRIX_COL > 1) {
					// 从第1行开始
					for (let row: number = 1; row <= MATRIX_ROW; row++) {
						// 最后一个下标序号
						const preEndIdx: number = getSequareIdx(row, 1)
						// TODO 如果合并过，可改preEndIdx-同时改回isAddedPreSquare = false

						// 每列和前一列的下标相差值
						const colIdxDelta: number = 1

						// 从第2列开始往移动方向合并
						for (let col: number = 2; col <= MATRIX_COL; col++) {
							// 每列开始值对应一元数组的下标
							const curColIdx: number = getSequareIdx(row, col)
							if (arr[curColIdx]) { // 当前列有值的情况
								console.log(`col=${col}, row=${row}, squaresIdx=${curColIdx}`)
								// preColIdx ：移动方向的前一列Idx
								for (let preColIdx: number = getSequareIdx(row, col - 1); preColIdx >= preEndIdx; preColIdx -= colIdxDelta) {
									if (arr[preColIdx]) {
										if (arr[curColIdx] === arr[preColIdx]) { // 合并
											arr[preColIdx] *= 2
											arr[curColIdx] = 0
										} else if ((curColIdx - preColIdx) / colIdxDelta > 1) { // curColIdx - preColIdx 之间有空格，则放置离lastRowIdx最近一格
											arr[preColIdx + colIdxDelta] = arr[curColIdx]
											arr[curColIdx] = 0
										}
										break
									} else if (!arr[preColIdx] && preColIdx === preEndIdx) { // 往移动方向进方向，如果到达头部，则放置于此
										arr[preColIdx] = arr[curColIdx]
										arr[curColIdx] = 0
									}
									// 继续往移动方向进方向寻找
								}
							}
						}	
					}
				}
				break
			}
			case RIGHT : {
				// 从倒数第2列开始往移动方向合并
				if (MATRIX_COL > 1) {
					// 从第1行开始
					for (let row: number = 1; row <= MATRIX_ROW; row++) {
						// 最后一个下标序号
						const preEndIdx: number = getSequareIdx(row, MATRIX_COL)
						// 每列和前一列的下标相差值
						const colIdxDelta: number = 1
						// 从倒数第2列开始往移动方向合并
						for (let col: number = MATRIX_COL - 1; col >= 1; col--) {
							// 每列开始值对应一元数组的下标
							const curColIdx: number = getSequareIdx(row, col)
							if (arr[curColIdx]) { // 当前列有值的情况
								console.log(`col=${col}, row=${row}, squaresIdx=${curColIdx}`)
								// preColIdx ：移动方向的前一列Idx
								for (let preColIdx: number = getSequareIdx(row, col + 1); preColIdx <= preEndIdx; preColIdx += colIdxDelta) {
									if (arr[preColIdx]) {
										if (arr[curColIdx] === arr[preColIdx]) { // 合并
											arr[preColIdx] *= 2
											arr[curColIdx] = 0
										} else if ((preColIdx - curColIdx) / colIdxDelta > 1) { // curColIdx - preColIdx 之间有空格，则放置离lastRowIdx最近一格
											arr[preColIdx - colIdxDelta] = arr[curColIdx]
											arr[curColIdx] = 0
										}
										break
									} else if (!arr[preColIdx] && preColIdx === preEndIdx) { // 往移动方向进方向，如果到达头部，则放置于此
										arr[preColIdx] = arr[curColIdx]
										arr[curColIdx] = 0
									}
									// 继续往移动方向进方向寻找
								}
							}
						}	
					}
				}
				break
			}
		}
		console.log(squares, arr)

		// 如果完全相同，则不发生变化
		if (JSON.stringify(squares) === JSON.stringify(arr)) return
		// 法1：
		setSequares(genNewNum(arr))

		// 法2：
		// setSequares(arr)
		// 为避免捕获过时的属性，需要异步函数获取
		// setSequares(origin => genNewNum(origin))
	}

	// 随机选一为0的square随机设置2或4
	function genNewNum (squares: number[]): number[] {
		const arr = squares.slice()
		const emptyIdxs: number[] = []
		for (let i : number = 0; i < arr.length; i++) {
			if (!arr[i]) {
				emptyIdxs.push(i)
			}
		}
		if (!emptyIdxs.length) { 
			return []
		}
		// 从1到coutZero里随机生成一个位置
		const idx = emptyIdxs[1 + Math.round(Math.random() * (emptyIdxs.length - 1))]
		// 随机设置2或4
		arr[idx] =  Math.round(Math.random()) ? 2 : 4
		// setSequares(arr)
		console.log('Sequares=', arr)
		return arr
	}

    useEffect(() => setSequares(genNewNum(squares)), []);
  
    return (
        <div 
			className="board" 
			onMouseDown={handleMouseDown} 
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
          {SquaresUI}
        </div>
    )
} 