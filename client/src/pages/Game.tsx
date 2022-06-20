/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-20 17:13:59
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /2048-react/client/src/pages/Game.tsx
 */
import React, { useState, useEffect } from 'react'

import Logo from '../components/Logo'
import Score from '../components/Score'
import Board from '../components/Board'
import GameButton from '../components/GameButton'
import Modal from '../components/Modal'
import ResultModal from '../components/ResultModal'

import { usePrevious } from '../utils/hooks'

import useSound from 'use-sound'
import beepSfx from '../sfx/s3.mp3'

import {
	MATRIX_ROW,
	MATRIX_COL,
	RIGHT,
	LEFT,
	DOWN,
	UP,
	Direction,
	IAHistoryOfSquares,
	STORAGE_GAME_HISTORY,
	STORAGE_GAME_SCORES,
} from '../utils/constants'

import '../scss/game.scss'


interface IGame { }

/**
 * 游戏
 */
const Game: React.FC<IGame> = (props) => {
	// 只记录最近操作的2步，故包括初始数组最多长度为3
	const [history, setHistory] = useState<IAHistoryOfSquares[]>([{ squares: new Array(16).fill(0) }])
	const [scores, setScores] = useState<number[]>([0])
	const [isOver, setIsOver] = useState<boolean>(false)
	const [bestScore, setBestScore] = useState<number>(Number(localStorage.getItem('bestScore') || 0))
	// 最高分原始值
	const preBestScore: number = usePrevious(bestScore) || 0
	// 音效播放
	const [isMute, setMute] = useState<boolean>(false)
	const [play] = useSound(beepSfx, { soundEnabled: isMute })

	// btn-undo是否可点击
	const disabledUndo: boolean = isOver || history.length < 3

	// 当前格对应一元数组的下标 —— 函数式编程
	const getSquareIdx: (row: number, col: number) => number = (row, col) => (row - 1) * MATRIX_COL + (col - 1)
	// 获取行号
	const getRow: (col: number, squareIdx: number) => number = (col, squareIdx) => (squareIdx - col + 1) / MATRIX_COL + 1
	// 获取列号
	const getCol: (row: number, squareIdx: number) => number = (row, squareIdx) => squareIdx + 1 - (row - 1) * MATRIX_COL
	// 随机选一为0的square随机设置2或4
	function genNewNum(squares: number[]): number[] {
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
		arr[idx] = Math.round(Math.random()) ? 2 : 4
		// console.log('Sequares=', arr)
		return arr
	}
	// 检查垂直于用户移动方向的方向上是否存在合并或者移动的可能性
	function checkPerpendicularDirPossibility(direction: Direction, squares: number[]): boolean {
		let possibility = false
		switch (direction) {
			case UP:
			case DOWN: {
				// 垂直的方向为：LEFT
				// 从第1行开始
				for (let row: number = 1; row <= MATRIX_ROW; row++) {
					if (possibility) break

					// 从第2列开始往移动方向合并
					for (let col: number = 2; col <= MATRIX_COL; col++) {
						if (possibility) break
						// 每列开始值对应一元数组的下标
						const curColIdx: number = getSquareIdx(row, col)
						if (squares[curColIdx]) { // 当前列有值的情况
							// preColIdx ：移动方向的前一列Idx
							const preColIdx: number = getSquareIdx(row, col - 1)
							if (
								!squares[preColIdx]
								|| squares[preColIdx] && squares[curColIdx] === squares[preColIdx]
							) {
								possibility = true
							}
						} else {
							possibility = true
						}
					}
				}
				break
			}
			case LEFT:
			case RIGHT: {
				// 垂直的方向为：UP
				// 从第1列开始
				for (let col: number = 1; col <= MATRIX_COL; col++) {
					if (possibility) break

					// 从第2行开始往移动方向合并
					for (let row: number = 2; row <= MATRIX_ROW; row++) {
						if (possibility) break
						// 每行开始值对应一元数组的下标
						const curRowIdx: number = getSquareIdx(row, col)
						if (squares[curRowIdx]) { // 当前行有值的情况
							// preRowIdx ：移动方向的前一行Idx
							let preRowIdx: number = getSquareIdx(row - 1, col)
							if (
								!squares[preRowIdx]
								|| squares[preRowIdx] && squares[curRowIdx] === squares[preRowIdx]
							) {
								possibility = true
							}
						} else {
							possibility = true
						}
					}
				}
				break
			}
		}
		return possibility
	}
	/**
	 * 移动处理
	 * 
	 **/
	function handleMove(direction: Direction): void {
		if (isOver) return

		const currentHistory: IAHistoryOfSquares = history[history.length - 1]
		const arr: number[] = currentHistory.squares!.slice()
		let scoreDelta = 0 // 本轮新增的得分
		switch (direction) {
			case UP: {
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
								// console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curRowIdx}`)
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
											// 播放音效
											play()
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
			case DOWN: {
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
								// console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curRowIdx}`)
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
											// 播放音效
											play()
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
			case LEFT: {
				// 从第2列开始往移动方向合并
				if (MATRIX_COL > 1) {
					// 从第1行开始
					for (let row: number = 1; row <= MATRIX_ROW; row++) {
						// 每列和前一列的下标相差值
						const colIdxDelta: number = 1
						// 列的开始指针，根据是否合并而更改移动后能比较的方块的最小下标值，默认从第1列开始
						let startPointer: number = 1

						// 从第2列开始往移动方向合并
						for (let col: number = 2; col <= MATRIX_COL; col++) {
							// 最后一个下标序号
							const preEndIdx: number = getSquareIdx(row, startPointer)
							// 每列开始值对应一元数组的下标
							const curColIdx: number = getSquareIdx(row, col)
							if (arr[curColIdx]) { // 当前列有值的情况
								// console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curColIdx}`)
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
											// 播放音效
											play()
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
			case RIGHT: {
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
								// console.log(`startPointer=${startPointer}, preEndIdx=${preEndIdx}, col=${col}, row=${row}, squareIdx=${curColIdx}`)
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
											// 播放音效
											play()
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

		// console.log(currentHistory.squares, arr)

		// 如果完全相同，则不发生变化
		if (JSON.stringify(currentHistory.squares) === JSON.stringify(arr)) {
			if (!checkPerpendicularDirPossibility(direction, arr)) {
				const curScore: number = scores[scores.length - 1]
				if (curScore > preBestScore) {
					setBestScore(curScore)
					localStorage.setItem('bestScore', curScore + '')
				}
				setIsOver(true)
				localStorage.removeItem(STORAGE_GAME_HISTORY)
				localStorage.removeItem(STORAGE_GAME_SCORES)
				// console.log('================ Game Over')
			}
			return
		}

		setHistory(history.concat([{ squares: arr }]))
		// 计算分数
		if (scoreDelta) {
			setScores(scores => {
				const prevScore = scores[scores.length - 1]
				const nowScore = prevScore + scoreDelta
				return [prevScore, nowScore]
			})
		}
		/**
		 * 逻辑：为避免捕获过时的属性，setSquares需要异步函数获取
		 * 优化：为体现先合并后随机顺序的逻辑，避免混淆，使用setTimeout。经人工调试不生硬，90ms比较符合视觉的展示
		 **/
		setTimeout(() => setHistory((oldHistory: IAHistoryOfSquares[]) => {
			// 当前历史的索引
			const curHistoryIdx: number = oldHistory.length - 1
			// 新历史集合
			let newHistory: IAHistoryOfSquares[] = oldHistory.slice()
			// 随机生成方块并替换当前历史
			newHistory.splice(curHistoryIdx, 1, { squares: genNewNum(newHistory[curHistoryIdx].squares!) })
			// 只保留初始记录 和 最近2次的操作记录
			if (newHistory.length > 3) {
				newHistory.splice(1, 1)
			}
			// console.log(`History`, newHistory)
			return newHistory
		}), 90)
	}

	// 开始游戏
	function startGame(): void {
		setHistory((oldHistory: IAHistoryOfSquares[]) => {
			// 新历史集合
			let newHistory: IAHistoryOfSquares[] = oldHistory.slice(0, 1)
			return newHistory.concat([{ squares: genNewNum(history[0].squares!) }])
		})
		setScores([0])
	}
	// 撤销上一步
	function undoGame(): void {
		if (history.length > 2) { // 除了初始数组外，存在上一步方可撤销
			setHistory((oldHistory: IAHistoryOfSquares[]) => oldHistory.slice(0, oldHistory.length - 1))
			setScores(scores => scores.slice(0, 1))
		}
	}

	// 初始化游戏界面
	useEffect(() => {
		const setNewHistory: () => void = () => setHistory((oldHistory: IAHistoryOfSquares[]) => {
			return oldHistory.concat([{ squares: genNewNum(history[0].squares!) }])
		})

		const StorageHistoryStr: string = localStorage.getItem(STORAGE_GAME_HISTORY) || ''
		const StorageScoresStr: string = localStorage.getItem(STORAGE_GAME_SCORES) || ''
		if (StorageHistoryStr && StorageScoresStr) {
			const SHistory: IAHistoryOfSquares[] = JSON.parse(StorageHistoryStr)
			const SScores: number[] = JSON.parse(StorageScoresStr)
			if (Array.isArray(SHistory) && SHistory.length > 1 && Array.isArray(SScores)) {
				setHistory(SHistory)
				setScores(SScores)
			} else {
				setNewHistory()
			}
		} else {
			setNewHistory()
		}
	}, []);

	// 记录操作至缓存
	useEffect(() => {
		localStorage.setItem(STORAGE_GAME_HISTORY, JSON.stringify(history))
		localStorage.setItem(STORAGE_GAME_SCORES, JSON.stringify(scores))
	}, [history])

	// 控制Modal
	const ModalUI: JSX.Element | null = isOver ? (
		<Modal>
			<ResultModal
				isShow={isOver}
				score={scores[scores.length - 1]}
				bestScore={preBestScore}
				onRestart={() => startGame()}
				onClose={() => setIsOver(false)}
			/>
		</Modal>
	)
		: null

	return (
		<div className="game">
			<header>
				<Logo />
				<Score name="SCORE" num={scores[scores.length - 1]} />
				<Score name="YOUR BEST" num={bestScore} />
				<GameButton name="NEW" onClick={() => startGame()} />
				<GameButton name="UNDO" btnDisabled={disabledUndo} onClick={() => undoGame()} />
			</header>
			<main>
				<p className="desc">Join the numbers and get to the 2048 tile!</p>
				<Board
					squares={history[history.length - 1].squares}
					onMove={(dir: Direction) => handleMove(dir)}
				/>
				<figure>
					<figcaption>
						<button onChange={() => setMute(!isMute)}>{
							isMute ? '🔊' : '🔇'
						}</button>
					</figcaption>
				</figure>
			</main>

			{ModalUI}
		</div>
	)
}

export default Game