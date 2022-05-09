import React, { useState, useEffect, useRef } from 'react'
import Square from './Square'

// 方向变量
const RIGHT: string = 'ArrowRight'
const LEFT: string = 'ArrowLeft'
const DOWN: string = 'ArrowDown'
const UP: string = 'ArrowUp'

// 判断不同设备移动触发游戏方块的最小值
const MIN_DISTANCE_PC: number = 100
const MIN_DISTANCE_M: number = 30

// 方块M*N矩阵常量
const MATRIX_ROW: number = 4
const MATRIX_COL: number = 4

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
	function getDirection (curX: number, curY: number, minDistance: number) : string {
		// 判断方向
		const deltaX: number = curX - coordinate.X
		const deltaY: number = curY - coordinate.Y

		const absDeltaX = Math.abs(deltaX)
		const absDeltaY = Math.abs(deltaY)

		// 定义鼠标移动不小于100，才认为是要操作，避免过敏误操作界面
		if (absDeltaX < minDistance && absDeltaY < minDistance) return ''
		
		// delta正值，认为是↓ 或 →，否则是↑ 或 ←
		const dirX: string = deltaX > 0 ? RIGHT : LEFT
		const dirY: string = deltaY > 0 ? DOWN : UP
		const deltaDir: number = absDeltaX - absDeltaY
		let direction: string = ''
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

	// 触摸事件
	function handleTouchStart (e: any) {
		console.log('handleTouchStart', e)
		coordinate.X = e.touches[0].clientX
		coordinate.Y = e.touches[0].clientY
	}
	function handleTouchEnd (e: any) {
		console.log('handleTouchEnd', e)
		const direction: string = getDirection(e.touches[0].clientX, e.touches[0].clientY, MIN_DISTANCE_M)
		handleMove(direction)
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

		const direction: string = getDirection(e.clientX, e.clientY, MIN_DISTANCE_PC)
		console.log('handleMouseUp', e, e.clientX, e.clientY, direction)
		handleMove(direction)
	}

	// 键盘事件
	function handleKeyUp (e: any) {
		console.log('handleKeyUp', e)
		switch (e.code) {
			case UP :
			case RIGHT :
			case DOWN :
			case LEFT : {
				const direction = e.code
				handleMove(direction)
				break
			}
		}
	}
	document.onkeyup = handleKeyUp

	// 当前格对应一元数组的下标
	function getRowIdx (row: number, col: number): number {
		return (row - 1) * MATRIX_COL + (col - 1)	
	}

	// 移动
	function handleMove (direction: string): void {
		const arr = squares.slice()
		const idxArr = [
			0,1,2,3,
			4,5,6,7,
			8,9,10,11,
			12,13,14,15
		]
		switch (direction) {
			case UP : {
				if (MATRIX_ROW > 1) {
					// 从第1列开始
					for (let col: number = 1; col <= MATRIX_COL; col++) {
						// 从第二行开始往前合并
						for (let row: number = 2; row <= MATRIX_ROW; row++) {
							// 每行开始值对应一元数组的下标
							const curRowIdx: number = getRowIdx(row, col)
							if (arr[curRowIdx]) { // 当前行有值的情况
								console.log(`col=${col}, row=${row}, squaresIdx=${curRowIdx}`)
								// 最后一个下标序号
								const preEndIdx = col - 1
								// 每行和上一行的下标相差值
								const rowIdxDelta: number = MATRIX_COL
								// preRowIdx ：前进方向的上一行Idx
								for (let preRowIdx: number = getRowIdx(row - 1, col); preRowIdx >= preEndIdx; preRowIdx -= rowIdxDelta) {
									if (arr[preRowIdx]) {
										if (arr[curRowIdx] === arr[preRowIdx]) {
											arr[preRowIdx] *= 2
											arr[curRowIdx] = 0
											break
										} else if ((curRowIdx - preRowIdx) / rowIdxDelta > 1) { // 可能curRowIdx - preRowIdx 之间有空格，则放置离lastRowIdx最近一格
											arr[preRowIdx + rowIdxDelta] = arr[curRowIdx]
											arr[curRowIdx] = 0
											break
										}
									} else if (!arr[preRowIdx] && preRowIdx === preEndIdx) { // 往前进方向，如果到达头部，则放置于此
										arr[preRowIdx] = arr[curRowIdx]
										arr[curRowIdx] = 0
									}
									// 继续往前进方向寻找
								}
							}
						}	
					}
					console.log(squares, arr)
					// 法1：
					setSequares(genNewNum(arr))

					// 法2：
					// setSequares(arr)
					// 为避免捕获过时的属性，需要异步函数获取
					// setSequares(origin => genNewNum(origin))
				}
				break
			}
			case DOWN : {
				// 从倒数第二行（第三行）开始往前合并
				if (MATRIX_ROW > 1) {
					// 从第1列开始
					for (let col: number = 1; col <= MATRIX_COL; col++) {
						// 从倒数第二行开始往前合并
						for (let row: number = MATRIX_ROW - 1; row <= MATRIX_ROW; row++) {
							// 每行开始值对应一元数组的下标
							const curRowIdx: number = getRowIdx(row, col)
							if (arr[curRowIdx]) { // 当前行有值的情况
								console.log(`col=${col}, row=${row}, squaresIdx=${curRowIdx}`)
								// 最后一个下标序号
								const preEndIdx = getRowIdx(MATRIX_ROW, col)
								// 每行和上一行的下标相差值
								const rowIdxDelta: number = MATRIX_COL
								// preRowIdx ：前进方向的上一行Idx
								for (let preRowIdx: number = getRowIdx(row + 1, col); preRowIdx <= preEndIdx; preRowIdx += rowIdxDelta) {
									if (arr[preRowIdx]) {
										if (arr[curRowIdx] === arr[preRowIdx]) {
											arr[preRowIdx] *= 2
											arr[curRowIdx] = 0
											break
										} else if ((preRowIdx - curRowIdx) / rowIdxDelta > 1) { // 可能curRowIdx - preRowIdx 之间有空格，则放置离lastRowIdx最近一格
											arr[preRowIdx - rowIdxDelta] = arr[curRowIdx]
											arr[curRowIdx] = 0
											break
										}
									} else if (!arr[preRowIdx] && preRowIdx === preEndIdx) { // 往前进方向找，如果到达头部，则放置于此
										arr[preRowIdx] = arr[curRowIdx]
										arr[curRowIdx] = 0
									}
									// 继续往前进方向寻找
								}
							}
						}	
					}
					console.log(squares, arr)
					// 法1：
					setSequares(genNewNum(arr))

					// 法2：
					// setSequares(arr)
					// 为避免捕获过时的属性，需要异步函数获取
					// setSequares(origin => genNewNum(origin))
				}
				break
			}
			case RIGHT : {
				// 从倒数第二列（第三列）开始往前合并
				break
			}
			case LEFT : {
				// 从第二列开始往前合并
				break
			}
		}
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