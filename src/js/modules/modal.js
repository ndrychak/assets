export const ModalModule = () => {
  const modal = document.getElementById('modal')
  const html = document.getElementById('html')
  const content = document.getElementById('content')
  
  const template = () => {
    return `
      <section id="modalContent" class="fixed bottom-0 w-full p-2 pb-10 rounded-t-xl bg-black h-modal"></section>`
  }

  const addListeners = () => {
    let touchstartY = 0
    let touchendY = 0

    const onTouchstart = (e) => {
      touchstartY = e.changedTouches[0].screenY
    }

    const onTouchEnd = (e) => {
      touchendY = e.changedTouches[0].screenY
      checkDirection()
    }
        
    function checkDirection() {
      if (touchendY > touchstartY + 100) {
        html.classList.remove(['overscroll-none'])
        content.classList.remove(...['blur-[1px]', 'brightness-50'])
        modal.innerHTML = ''
        modal.removeEventListener('touchstart', onTouchstart)
        modal.removeEventListener('touchend', onTouchEnd)
      }
    }

    modal.addEventListener('touchstart', onTouchstart)
    modal.addEventListener('touchend', onTouchEnd)
  }

  const render = (callback) => {
    modal.innerHTML = template()
    html.classList.add(['overscroll-none'])
    content.classList.add(...['blur-[1px]', 'brightness-50'])
    addListeners()
    callback && callback()
  }

  return {
    render,
  }
}