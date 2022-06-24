/*
 * @Author: swancai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-06-24 15:47:37
 * @LastEditors: swancai
 * @Description: 
 * @FilePath: \zjgp_zjhye:\job\ts\2048-react\react\src\components\Game\Board.tsx
 */
import React from 'react'
import Square from '@components/Game/Square'

import {
	MIN_DISTANCE_PC,
	MIN_DISTANCE_M,
	RIGHT,
	LEFT,
	DOWN,
	UP,
	Direction
} from '@utils/constants'
interface IPropBoard {
	randomNumIdx: number // 随机数字的下标
	squares: number[] // 方块集
	onMove: (dir: Direction) => void // 处理移动结果
}
const Board: React.FC<IPropBoard> = (props) => {
	const { randomNumIdx, squares, onMove } = props
	let coordinate = {
		X: 0,
		Y: 0
	}

	const SquaresUI: JSX.Element[] = squares.map((n: number, idx: React.Key | null | undefined) => {
		return <Square num={n} key={idx} isDelayShow={idx == randomNumIdx} />
	})
	// 获取方向
	function getDirection(curX: number, curY: number, minDistance: number): Direction | null {
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

	// 触摸事件
	function handleTouchStart(e: React.TouchEvent) {
		e.preventDefault()
		e.stopPropagation()
		// console.log('handleTouchStart', e)
		// // TODO: 多于一个手指不做反映
		// if (e.touches.length > 1) return

		coordinate.X = e.touches[0].clientX
		coordinate.Y = e.touches[0].clientY
	}
	function handleTouchEnd(e: React.TouchEvent) {
		e.preventDefault()
		e.stopPropagation()
		// console.log('handleTouchEnd', e)
		// TODO: 多于一个手指不做反映
		// if (e.changedTouches.length > 1) return
		// 不在区域内，不执行后续代码
		if (!coordinate.X && !coordinate.Y) {
			// reset
			coordinate.X = 0
			coordinate.Y = 0
			return
		}

		const direction: Direction | null = getDirection(e.changedTouches[0].clientX, e.changedTouches[0].clientY, MIN_DISTANCE_M)
		if (direction) {
			onMove(direction)
		}
	}

	// 鼠标事件
	function handleMouseDown(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		// console.log('handleMouseDown', e, e.clientX, e.clientY)

		coordinate.X = e.clientX
		coordinate.Y = e.clientY
	}
	function handleMouseUp(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		// 不在区域内，不执行后续代码
		if (!coordinate.X && !coordinate.Y) {
			// reset
			coordinate.X = 0
			coordinate.Y = 0
			return
		}

		const direction: Direction | null = getDirection(e.clientX, e.clientY, MIN_DISTANCE_PC)
		// console.log('handleMouseUp', e, e.clientX, e.clientY, direction)
		if (direction) {
			onMove(direction)
		}
	}

	// 键盘事件
	function handleKeyUp(e: KeyboardEvent) {
		e.stopPropagation()
		// console.log('handleKeyUp', e)
		switch (e.code) {
			case UP:
			case RIGHT:
			case DOWN:
			case LEFT: {
				const direction: Direction = e.code
				if (direction) {
					onMove(direction)
				}
				break
			}
		}
	}
	document.onkeyup = handleKeyUp

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
export default Board