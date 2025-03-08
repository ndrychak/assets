import { ModalModule } from './modal.js'
import { ChartModule } from './chart.js'
import { AssetFormModule } from './assetForm.js'
import { CurrencyModule } from './currency.js'

export const FooterModule = () => {
  const renderButton = (type) => {
    return type ? `
      <button id="${type}Btn" class="relative w-16 h-16">
        <img src="assets/${type}.png" class="absolute w-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
      </button>` : ''
  }

  const buttons = ['currency', '', 'add', '', 'chart'].map(button => (`<li class="text-center">${renderButton(button)}</li>`)).join('')
  const template = () => (`<ul class="fixed grid grid-cols-5 gap-4 left-0 bottom-0 w-full p-4 bg-transparent rounded-t-xl items-baseline">${buttons}</ul>`)

  const addListeners = () => {
    document.getElementById('currencyBtn').addEventListener('click', (e) => {
      e.preventDefault()
      ModalModule().render(CurrencyModule().render)
    });

    document.getElementById('addBtn').addEventListener('click', (e) => {
      e.preventDefault()

      ModalModule().render(AssetFormModule().render)
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