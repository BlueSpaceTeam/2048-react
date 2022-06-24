import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
	STORAGE_GAME_HISTORY,
	STORAGE_GAME_SCORES,
} from '@utils/constants'

interface ILogoButton {}

const LogoButton: React.FC<ILogoButton> = (props) => {
	let navigate = useNavigate()
	// 返回首页
	const backHome: () => void = () => {
		localStorage.removeItem(STORAGE_GAME_HISTORY)
		localStorage.removeItem(STORAGE_GAME_SCORES)
		if (window.history && window.history.length > 1) {
			navigate(-1)
		} else {
			navigate('/', { replace: true })
		}
	}
    return <button className="logo" onClick={() => backHome()}>2048</button>
}

export default LogoButton