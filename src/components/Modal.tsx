/*
 * @Author: Swan Cai
 * @Date: 2022-05-24 16:58:00
 * @LastEditTime: 2022-05-24 16:58:00
 * @LastEditors: Swan Cai
 * @Description: 
 * @FilePath: /2048-react/src/components/Modal.tsx
 */
import react, { useState, useEffect }  from 'react'
import ReactDOM from 'react-dom'

interface IPropsModal {
    children: JSX.Element | JSX.Element[] | string | number | null 
}

export default function Modal (props: IPropsModal) {
    const modalRoot: HTMLElement = document.getElementById('modal')!

    // const [wrapperEle] = useState<HTMLElement>(document.createElement('div'))
    const wrapperEle: HTMLElement = document.createElement('div')

    // 为了单页应用，别的页面可能应用该#modal嵌入各种toast、modal等，故我在此用了这个hook，移除没用的modal
    useEffect(() => {
        // 在 Modal 的所有子元素被挂载后，
		// 这个 portal 元素会被嵌入到 DOM 树中，
		// 这意味着子元素将被挂载到一个分离的 DOM 节点中。
		// 如果要求子组件在挂载时可以立刻接入 DOM 树，
		// 例如衡量一个 DOM 节点，
		// 或者在后代节点中使用 ‘autoFocus’，
		// 则需添加 state 到 Modal 中，
		// 仅当 Modal 被插入 DOM 树中才能渲染子元素。
		modalRoot.appendChild(wrapperEle)
		console.log('MODAL BE MOUNTED')

		return () => {
			modalRoot.removeChild(wrapperEle)
			console.log('MODAL BE UNMOUNTED')
		}
   }, [])

   return ReactDOM.createPortal(props.children, wrapperEle)
}