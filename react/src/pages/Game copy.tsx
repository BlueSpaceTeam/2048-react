// /*
//  * @Author: swancai
//  * @Date: 2022-05-24 16:58:00
//  * @LastEditTime: 2022-06-24 15:01:21
//  * @LastEditors: swancai
//  * @Description: 
//  * @FilePath: \zjgp_zjhye:\job\ts\2048-react\react\src\pages\Game.tsx
//  */
// import React, { useState, useEffect } from 'react'

// import LogoButton from '@components/Game/LogoButton'
// import Score from '@components/Game/Score'
// import Board from '@components/Game/Board'
// import GameButton from '@components/Game/GameButton'

// import Portal from '@components/common/Portal'
// import ResultModal from '@components/Game/ResultModal'

// import { usePrevious } from '@utils/hooks'
// import { startTimeDiff, endTimeDiff } from '@utils/timer'

// import {
// 	genNewNum,
// 	checkPerpendicularDirPossibility,
// 	getMoveResult
// } from '@utils/movingLogic'

// // 引入声音模块
// import useSound from 'use-sound'
// import beepSfx from '@/sfx/s1.mp3'

// import {
// 	Direction,
// 	IAHistoryOfSquares,
// 	STORAGE_GAME_HISTORY,
// 	STORAGE_GAME_SCORES,
// 	STORAGE_BEST_SCORE,
// } from '@utils/constants'

// import '@scss/game.scss'


// interface IGame { }

// // 初始化的方块历史
// const initialHistory = { squares: new Array(16).fill(0) }

// /**
//  * 游戏
//  */
// const Game: React.FC<IGame> = (props) => {
// 	// 游戏移动记录：[初始记录,(上一步记录,)当前记录]。只记录最近操作的2步，故包括初始数组最多长度为3
// 	const [history, setHistory] = useState<IAHistoryOfSquares[]>([initialHistory])
// 	// 分数：[(上一步分数,)当前分数]
// 	const [scores, setScores] = useState<number[]>([0])
// 	// 总耗时（毫秒）
// 	const [timeSpent, setTimeSpent] = useState<number>(0)
// 	// 游戏是否结束
// 	const [isOver, setIsOver] = useState<boolean>(false)
// 	// 最高分
// 	const [bestScore, setBestScore] = useState<number>(Number(localStorage.getItem(STORAGE_BEST_SCORE) || 0))
// 	// 最高分原始值
// 	const preBestScore: number = usePrevious(bestScore) || 0
// 	// 音效播放
// 	const [isMuted, setMuted] = useState<boolean>(false)
// 	const [play] = useSound(beepSfx, { soundEnabled: !isMuted })

// 	// btn-undo是否可点击
// 	const disabledUndo: boolean = isOver || history.length < 3

// 	// 从垂直于当前操作方向的方向来检查没有机会合并，game over的回调处理
// 	const gameOverCallback: () => void = () => {
// 		// 结束时间差计算
// 		setTimeSpent(endTimeDiff())

// 		const curScore: number = scores[scores.length - 1]
// 		if (curScore > preBestScore) {
// 			setBestScore(curScore)
// 			localStorage.setItem(STORAGE_BEST_SCORE, curScore + '')
// 		}
// 		setIsOver(true)
// 		localStorage.removeItem(STORAGE_GAME_HISTORY)
// 		localStorage.removeItem(STORAGE_GAME_SCORES)
// 		// console.log('================ Game Over')
// 	}

// 	/**
// 	 * 移动处理
// 	 * 
// 	 **/
// 	function handleMove(direction: Direction): void {
// 		if (isOver) return

// 		const currentHistory: IAHistoryOfSquares = history[history.length - 1]
// 		const { arr = [], scoreDelta = 0 } = getMoveResult(direction, currentHistory.squares!.slice())
// 		// console.log(currentHistory.squares, arr)
// 		// 如果完全相同，则不发生变化
// 		if (JSON.stringify(currentHistory.squares) === JSON.stringify(arr)) {
// 			// 从垂直于当前操作方向的方向来检查是否仍然有机会合并，如果没有则认为游戏结束
// 			if (!checkPerpendicularDirPossibility(direction, arr)) {
// 				gameOverCallback()
// 			}
// 			return
// 		} else {
// 			// 从垂直于当前操作方向的方向来检查是否仍然有机会合并，如果没有则认为游戏结束
// 			if (!checkPerpendicularDirPossibility(direction, arr)) {
// 				gameOverCallback()
// 				return
// 			}
// 		}

// 		// 播放音效
// 		play()
// 		setHistory(history.concat([{ squares: arr }]))
// 		// 计算分数
// 		if (scoreDelta) {
// 			setScores((scores: string | any[]) => {
// 				const prevScore = scores[scores.length - 1]
// 				const nowScore = prevScore + scoreDelta
// 				return [prevScore, nowScore]
// 			})
// 		}
// 		/**
// 		 * 逻辑：为避免捕获过时的属性，setSquares需要异步函数获取
// 		 * 优化：为体现先合并后随机顺序的逻辑及动画，避免视觉混淆，使用setTimeout。经人工调试不生硬，90ms比较符合视觉的展示
// 		 **/
// 		setTimeout(() => setHistory((oldHistory: IAHistoryOfSquares[]) => {
// 			// 当前历史的索引
// 			const curHistoryIdx: number = oldHistory.length - 1
// 			// 新历史集合
// 			let newHistory: IAHistoryOfSquares[] = oldHistory.slice()
// 			// 随机生成方块并替换当前历史
// 			newHistory.splice(curHistoryIdx, 1, { squares: genNewNum(newHistory[curHistoryIdx].squares!) })
// 			// 只保留初始记录 和 最近2次的操作记录
// 			if (newHistory.length > 3) {
// 				newHistory.splice(1, 1)
// 			}
// 			// console.log(`History`, newHistory)
// 			return newHistory
// 		}), 90)
// 	}

// 	// 历史记录重新设置
// 	const resetHistory: () => void = () => setHistory([initialHistory, { squares: genNewNum(initialHistory.squares) }])

// 	// 开始游戏
// 	const startGame: () => void = () => {
// 		// 开始时间差计算
// 		startTimeDiff()
// 		resetHistory()
// 		setScores([0])
// 	}
// 	// 撤销上一步
// 	const undoGame: () => void = () => {
// 		if (history.length > 2) { // 除了初始数组外，存在上一步方可撤销
// 			setHistory((oldHistory: IAHistoryOfSquares[]) => oldHistory.slice(0, oldHistory.length - 1))
// 			setScores((scores: number[]) => scores.slice(0, 1))
// 		}
// 	}

// 	// 初始化游戏界面
// 	useEffect(() => {
// 		// 开始时间差计算
// 		startTimeDiff()
// 		const StorageHistoryStr: string = localStorage.getItem(STORAGE_GAME_HISTORY) || ''
// 		const StorageScoresStr: string = localStorage.getItem(STORAGE_GAME_SCORES) || ''
// 		if (StorageHistoryStr && StorageScoresStr) {
// 			const SHistory: IAHistoryOfSquares[] = JSON.parse(StorageHistoryStr)
// 			const SScores: number[] = JSON.parse(StorageScoresStr)
// 			if (SHistory.length > 1) {
// 				setHistory(SHistory)
// 				setScores(SScores)
// 			} else {
// 				resetHistory()
// 			}
// 		} else {
// 			resetHistory()
// 		}
// 	}, [])

// 	// 记录操作至缓存
// 	useEffect(() => {
// 		localStorage.setItem(STORAGE_GAME_HISTORY, JSON.stringify(history))
// 	}, [history])
// 	// 记录操作至缓存
// 	useEffect(() => {
// 		localStorage.setItem(STORAGE_GAME_SCORES, JSON.stringify(scores))
// 	}, [scores])

// 	// 控制Modal
// 	const ModalUI: JSX.Element | null = isOver ? (
// 		<Portal>
// 			<ResultModal
// 				isShow={isOver}
// 				score={scores[scores.length - 1]}
// 				timeSpent={timeSpent}
// 				bestScore={preBestScore}
// 				onRestart={() => startGame()}
// 				onClose={() => setIsOver(false)}
// 			/>
// 		</Portal>
// 	)
// 		: null

// 	return (
// 		<div className="game">
// 			<header>
// 				<LogoButton />
// 				<Score name="SCORE" num={scores[scores.length - 1]} />
// 				<Score name="YOUR BEST" num={bestScore} />
// 				<GameButton name="NEW" onClick={() => startGame()} />
// 				<GameButton name="UNDO" btnDisabled={disabledUndo} onClick={() => undoGame()} />
// 				<GameButton name={isMuted ? 'MUTED' : 'UNMUTED'} onClick={() => setMuted(!isMuted)} />
// 			</header>
// 			<main>
// 				<p className="desc">Join the numbers and get to the 2048 tile!</p>
// 				<Board
// 					squares={history[history.length - 1].squares}
// 					onMove={(dir: Direction) => handleMove(dir)}
// 				/>
// 			</main>

// 			{ModalUI}
// 		</div>
// 	)
// }

// export default Game