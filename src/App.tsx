import React, { useState, useEffect, useRef } from 'react'

import Score from './components/Score'
import Board from './components/Board'

import {
	MATRIX_ROW,
	MATRIX_COL,
	RIGHT,
	LEFT,
	DOWN,
	UP,
	Direction
} from './constants'

interface IAHistoryOfSquares {
	squares: number[]
}

export default function App() {
	const [history, setHistory] = useState<IAHistoryOfSquares[]>([{
		squares: new Array(16).fill(0)
	}])
	const [score, setScore] = useState<number>(0)

	
	// 当前格对应一元数组的下标 —— 函数式编程
	const getSquareIdx: (row: number, col: number) => number = (row, col) => (row - 1) * MATRIX_COL + (col - 1)
	// 获取行号
	const getRow: (col: number, squareIdx: number) => number = (col, squareIdx) => (squareIdx - col + 1) / MATRIX_COL + 1
	// 获取列号
	const getCol: (row: number, squareIdx: number) => number = (row, squareIdx) => squareIdx + 1 - (row - 1) * MATRIX_COL
	// 随机选一为0的square随机设置2或4
	function genNewNum (squares: number[]): number[] {
		const arr = squares.slice()
		const emptyIdxs: number[] = []
		for (let i: number = 0; i < arr.length; i++) {
			if (!arr[i]) {
				emptyIdxs.push(i)
			}
		}
		if (!emptyIdxs.length) { // 返回自身，避免用空数组覆盖原来结果
			return arr 
		}
		// 从1到coutZero里随机生成一个位置
		const idx = emptyIdxs[Math.round(Math.random() * (emptyIdxs.length - 1))]
		// 随机设置2或4
		arr[idx] =  Math.round(Math.random()) ? 2 : 4
		// setSquares(arr)
		console.log('Sequares=', arr)
		return arr
	}
	/**
	 * 移动处理
	 * 
	 **/
	function handleMove (direction: Direction): void {
		const currentHistory: IAHistoryOfSquares = history[history.length - 1]
		const arr: number[] = currentHistory.squares.slice()
		let scoreDelta = 0 // 本轮新增的得分
		switch (direction) {
			case UP : {
				if (MATRIX_ROW > 1) {
					// 从第1列开始
					for (let col: number = 1; col <= MATRIX_COL; col++) {
						// 每行和前一行的下标相差值
						const rowIdxDelta: number = MATRIX_COL
						// 行的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
						let startPointer: number = 1

						// 从第2行开始往移动方向合并
						for (let row: number = 2; row <= MATRIX_ROW; row++) {
							// 最后一个下标序号
							const preEndIdx: number = getSquareIdx(startPointer, col)
							// 每行开始值对应一元数组的下标
							const curRowIdx: number = getSquareIdx(row, col)
							if (arr[curRowIdx]) { // 当前行有值的情况
								console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curRowIdx}`)
								// preRowIdx ：移动方向的前一行Idx
								for (let preRowIdx: number = getSquareIdx(row - 1, col); preRowIdx >= preEndIdx; preRowIdx -= rowIdxDelta) {
									if (arr[preRowIdx]) {
										if (arr[curRowIdx] === arr[preRowIdx]) { // 合并
											arr[preRowIdx] *= 2
											arr[curRowIdx] = 0
											// 最后+1是因为起始指针从合并的下一位开始
											startPointer = getRow(col, preRowIdx) + 1
											// 计算分数
											scoreDelta += arr[preRowIdx]
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
						// 每行和前一行的下标相差值
						const rowIdxDelta: number = MATRIX_COL
						// 行的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
						let startPointer: number = MATRIX_ROW

						// 从倒数第2行开始往移动方向合并
						for (let row: number = MATRIX_ROW - 1; row >= 1; row--) {
							// 最后一个下标序号
							const preEndIdx: number = getSquareIdx(startPointer, col)
							// 每行开始值对应一元数组的下标
							const curRowIdx: number = getSquareIdx(row, col)
							if (arr[curRowIdx]) { // 当前行有值的情况
								console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curRowIdx}`)
								// preRowIdx ：移动方向的前一行Idx
								for (let preRowIdx: number = getSquareIdx(row + 1, col); preRowIdx <= preEndIdx; preRowIdx += rowIdxDelta) {
									if (arr[preRowIdx]) {
										if (arr[curRowIdx] === arr[preRowIdx]) { // 合并
											arr[preRowIdx] *= 2
											arr[curRowIdx] = 0
											// 最后-1是因为起始指针从合并的下一位开始
											startPointer = getRow(col, preRowIdx) - 1
											// 计算分数
											scoreDelta += arr[preRowIdx]
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
						// 每列和前一列的下标相差值
						const colIdxDelta: number = 1
						// 列的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
						let startPointer: number = 1

						// 从第2列开始往移动方向合并
						for (let col: number = 2; col <= MATRIX_COL; col ++) {
							// 最后一个下标序号
							const preEndIdx: number = getSquareIdx(row, startPointer)
							// 每列开始值对应一元数组的下标
							const curColIdx: number = getSquareIdx(row, col)
							if (arr[curColIdx]) { // 当前列有值的情况
								console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curColIdx}`)
								// preColIdx ：移动方向的前一列Idx
								for (let preColIdx: number = getSquareIdx(row, col - 1); preColIdx >= preEndIdx; preColIdx -= colIdxDelta) {
									if (arr[preColIdx]) {
										if (arr[curColIdx] === arr[preColIdx]) { // 合并
											arr[preColIdx] *= 2
											arr[curColIdx] = 0
											// 最后+1是因为起始指针从合并的下一位开始
											startPointer = getCol(row, preColIdx) + 1
											// 计算分数
											scoreDelta += arr[preColIdx]
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
						// 每列和前一列的下标相差值
						const colIdxDelta: number = 1
						// 列的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
						let startPointer: number = MATRIX_COL

						// 从倒数第2列开始往移动方向合并
						for (let col: number = MATRIX_COL - 1; col >= 1; col--) {
							// 最后一个下标序号
							const preEndIdx: number = getSquareIdx(row, startPointer)
							// 每列开始值对应一元数组的下标
							const curColIdx: number = getSquareIdx(row, col)
							if (arr[curColIdx]) { // 当前列有值的情况
								console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curColIdx}`)
								// preColIdx ：移动方向的前一列Idx
								for (let preColIdx: number = getSquareIdx(row, col + 1); preColIdx <= preEndIdx; preColIdx += colIdxDelta) {
									if (arr[preColIdx]) {
										if (arr[curColIdx] === arr[preColIdx]) { // 合并
											arr[preColIdx] *= 2
											arr[curColIdx] = 0
											// 最后-1是因为起始指针从合并的下一位开始
											startPointer = getCol(row, preColIdx) - 1
											// 计算分数
											scoreDelta += arr[preColIdx]
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
		console.log(currentHistory.squares, arr)

		// 如果完全相同，则不发生变化
		if (JSON.stringify(currentHistory.squares) === JSON.stringify(arr)) {
			if (!arr.filter(n => !n).length) {
				alert('Game Over !')
			}
			return
		}
		setHistory(history.concat([{ squares: arr }]))
		// 计算分数
		if (scoreDelta) {
			setScore(score => score + scoreDelta)
		}
		/**
		 * 逻辑：为避免捕获过时的属性，setSquares需要异步函数获取
		 * 优化：为体现先合并后随机顺序的逻辑，避免混淆，使用setTimeout。经人工调试不生硬，90ms比较符合视觉的展示
		 **/ 
		setTimeout(() => setHistory((originHistory: IAHistoryOfSquares[]) => {
			// 当前历史的索引
			const curHistoryIdx: number = originHistory.length - 1
			// 新历史集合
			let newHistory: IAHistoryOfSquares[] = originHistory.slice(0, curHistoryIdx)
			// 随机生成方块并替换当前历史
			const curHistory: IAHistoryOfSquares = originHistory[curHistoryIdx]
			newHistory.splice(curHistoryIdx, 1, { squares: genNewNum(curHistory.squares) })
			return newHistory
		}), 90)
	}
	// 开始游戏
	function startGame () : void {
		setHistory((originHistory: IAHistoryOfSquares[]) => {
			// 当前历史的索引
			const curHistoryIdx: number = 1
			// 新历史集合
			const newHistory: IAHistoryOfSquares[] = originHistory.slice(0, curHistoryIdx)
			// 随机生成方块并替换当前历史
			const curHistory: IAHistoryOfSquares = originHistory[curHistoryIdx]
			return newHistory.splice(curHistoryIdx, 1, { squares: genNewNum(curHistory.squares) })
		})
	}
	// 撤销上一步
	function undoGame () : void {
		setHistory((originHistory: IAHistoryOfSquares[]) => {
			// 当前历史的索引
			const curHistoryIdx: number = originHistory.length - 2
			// 上一步历史集合
			return originHistory.slice(0, curHistoryIdx)
		})
	}

    useEffect(() =>{
		const currentHistory: IAHistoryOfSquares = history[history.length - 1]
		const newSquares: number[] = genNewNum(currentHistory.squares)
		const newHistory = history.concat([{ squares: newSquares }])
		setHistory(newHistory)
	}, []);


  return (
    <div className="game">
		<header>
			<div className="logo">2048</div>
			<Score name="SCORE" num={score} />
			<Score name="BEST" num={'34.5K'} />
			<button className="btn btn-new" onClick={() => startGame()}>NEW</button>
			<button className="btn btn-undo" onClick={() => undoGame()}>UNDO</button>
		</header>
		<main>
			<p className="desc">Join the numbers and get to the 2048 tile!</p>
			<Board 
				squares={history[history.length - 1].squares} 
				onMove={(dir: Direction) => handleMove(dir)} 
			/>
		</main>
		<footer>
			<span>Written in React and Typescript</span>
			<span>by Swan Cai</span>
			<span>on May 4th, 2022.</span>
		</footer>
    </div>
  )
}
