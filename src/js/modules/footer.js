import { api } from '../helpers/api.js'
import { ModalModule } from './modal.js'
import { ChartModule } from './chart.js'

export const FooterModule = (renderAssets) => {
  const renderButton = (type) => {
    return `<button id="${type}Btn" class="relative w-16 h-16">
              <img src="assets/${type}.png" class="absolute w-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
            </button>`
  }

   const template = () => {
    return `
      <ul class="fixed grid grid-cols-5 gap-4 bottom-0 w-full p-4 items-baseline">
        <li>
          ${renderButton('currency')}
        </li>
        <li></li>
        <li>
          ${renderButton('refresh')}
        </li>
        <li></li>
        <li>
          ${renderButton('chart')}
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

    document.getElementById('chartBtn').addEventListener('click', (e) => {
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