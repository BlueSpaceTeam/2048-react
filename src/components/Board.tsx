import React, { useState, useEffect, useRef } from 'react'
import Square from './Square'

const RIGHT: string = 'ArrowRight'
const LEFT: string = 'ArrowLeft'
const DOWN: string = 'ArrowDown'
const UP: string = 'ArrowUp'

const MIN_DISTANCE_PC = 100
const MIN_DISTANCE_M = 30

export default function Board (props: any) {
    // const boardRef = useRef(null)
    // const Squares = new Array(16).fill(0).map((n, idx) => {
    //   return <Square num={2**(idx + 1)} key={idx} />
    // })
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

		// 定义鼠标移动不小于100，才认为是要操作，避免过敏误操作界面
		if (Math.abs(deltaX) < minDistance && Math.abs(deltaY) < minDistance) return ''
		
		// delta正值，认为是↓ 或 →，否则是↑ 或 ←
		const dirX: string = deltaX ? RIGHT : LEFT
		const dirY: string = deltaY ? DOWN : UP
		const deltaDir: number = deltaX - deltaY
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

		console.log('handleMouseUp', e.clientX, e.clientY)
		const direction: string = getDirection(e.clientX, e.clientY, MIN_DISTANCE_PC)
	}

	// 键盘事件
	function handleKeyUp (e: any) {
		console.log('handleKeyUp', e)
		switch (e.code) {
			case UP : {
				break
			}
			case RIGHT : {
				break
			}
			case DOWN : {
				break
			}
			case LEFT : {
				break
			}
		}
	}
	document.onkeyup = handleKeyUp

	// 随机选一为0的square随机设置2或4
	function genNewNum (): void {
		const emptyIdxs: number[] = []
		for (let i : number = 0; i < squares.length; i++) {
			if (!squares[i]) {
				emptyIdxs.push(i)
			}
		}

		console.log('?')

		// emptyIdxs.length = 0，则结束游戏-TODO 弹窗
		if (!emptyIdxs.length) { 
			return 
		}
		// 从1到coutZero里随机生成一个位置
		const idx = emptyIdxs[1 + Math.round(Math.random() * (emptyIdxs.length - 1))]
		const arr = squares.slice()
		// 随机设置2或4
		arr[idx] =  Math.round(Math.random()) ? 2 : 4
		setSequares(arr)
		console.log('arr', arr)
	}
	// genNewNum() //--- 死循环

    useEffect(() => {
		console.log('in')
		// console.log(boardRef)
		// boardRef.current && boardRef.current.onmouseup = () => console.log('onmouseup')
      	return () => {}
    });
  
    return (
        // <div ref={boardRef} className="board">
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