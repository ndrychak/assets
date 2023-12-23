export const ModalModule = () => {
  const modal = document.getElementById('modal')
  const html = document.getElementById('html')
  const content = document.getElementById('content')
  
  const template = () => {
    return `
      <section id="modalContent" class="fixed bottom-0 w-full p-4 rounded-t-lg bg-gradient-to-r from-black to-slate-900"></section>`
  }

  const addListeners = () => {
    let touchstartY = 0
    let touchendY = 0
        
    function checkDirection() {
      if (touchendY > touchstartY + 100) {
        html.classList.remove(['overscroll-none'])
        content.classList.remove(['blur-[2px]'])
        modal.innerHTML = ''
        modal.removeEventListener('touchstart')
        modal.removeEventListener('touchend')
      }
    }

    modal.addEventListener('touchstart', e => {
      touchstartY = e.changedTouches[0].screenY
    })

    modal.addEventListener('touchend', e => {
      touchendY = e.changedTouches[0].screenY
      checkDirection()
    })
  }

  const render = (callback) => {
    modal.innerHTML = template()
    html.classList.add(['overscroll-none'])
    content.classList.add(['blur-[2px]'])
    addListeners()
    callback && callback()
  }

  return {
    render,
  }
}