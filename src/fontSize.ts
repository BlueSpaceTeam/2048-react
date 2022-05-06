
function setBaseFontSize (): void {
    const clientWidth: number = Math.max(Math.min(document.documentElement.clientWidth, 750), 320)
    const fontsize : number = clientWidth / 7.5
    document.documentElement.style.fontSize = `${fontsize}px`
}

setBaseFontSize()
window.onresize = setBaseFontSize
