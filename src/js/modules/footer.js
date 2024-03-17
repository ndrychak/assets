import { api } from '../helpers/api.js'
import { ModalModule } from './modal.js'
import { ChartModule } from './chart.js'

export const FooterModule = (renderAssets) => {
  const template = () => {
    const buttonStyles = 'relative rounded-full text-xs bg-gradient-to-r from-[#ECB635] to-[#FFC646]'
    const imageStyles = 'absolute w-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'

    return `
      <ul class="fixed flex gap-4 bottom-6 right-4 items-baseline">
        <li>
          <button id="chartsBtn" class="${buttonStyles} w-10 h-10">
            <img src="assets/chart.png" class="${imageStyles}"/>
          </button>  
        </li>
        <li>
        <button id="refreshBtn" class="${buttonStyles} w-16 h-16">
          <img src="assets/refresh.png" class="${imageStyles}"/>
        </button>
      </li>
    </ul>`
  }

  const addListeners = () => {
    document.getElementById('refreshBtn').addEventListener('click', (e) => {
      e.preventDefault()

      const callback = () => {
        renderAssets && renderAssets()
      }
      api().requestSheet(callback)
    });

    document.getElementById('chartsBtn').addEventListener('click', (e) => {
      e.preventDefault()
      ModalModule().render(ChartModule().render)
    });
  }

  const render = () => {
    document.getElementById('footer').innerHTML = template()
    addListeners()
  }

  return {
    render,
  }
}