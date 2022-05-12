import React from 'react'
import Square from './Square'

import {
	MIN_DISTANCE_PC,
	MIN_DISTANCE_M,
	RIGHT,
	LEFT,
	DOWN,
	UP,
	Direction
} from '../constants'

export default function Board (props: any) {
	const { squares, onMove } = props
	let coordinate = {
		X: 0,
		Y: 0
	}

    const SquaresUI: JSX.Element[] = squares.map((n: number, idx: React.Key | null | undefined) => {
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
			onMove(direction)
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
			onMove(direction)
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