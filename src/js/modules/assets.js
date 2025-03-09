import { storage } from '../helpers/storage.js'
import { money } from '../helpers/money.js'
import { ModalModule } from '../modules/modal.js'
import { AssetFormModule } from '../modules/assetForm.js'

export const AssetsModule = () => {
  const template = ({ bg, title, note, valueUSD, incomeUSD, rate, id }) => {
    return `
      <li class="w-full">
        <button id="${id}" class="asset-button w-full relative text-left rounded-md shadow-[0_1px_2px_0_rgb(0_0_0_/_.5)] px-4 py-2 bg-gradient-to-r ${bg}">
          <p class="text-xl font-bold -mb-2">${title}<span class="text-base float-right">${rate}</span></p>
          <p class="text-base -mb-1">${note}&nbsp;</p>
          <p class="text-xl font-bold">${valueUSD}&nbsp;${incomeUSD}</p>
        </button>
      </li>`
  }

  const getAssetsList = (data) => {
    const list = data.reduce((acc, item) => {
      const bg = item.interestRate ? 'from-[rgba(20,43,44,.7)] to-[rgba(31,67,68,.7)]' : 'from-[rgba(15,23,42,.7)] to-[rgba(30,41,59,.7)]';
      const rate = item.interestRate > 0.01 ? `${item.interestRate}%` : ''
      const valueClass = item.currency !== 'USD' ? 'opacity-40' : ''

      acc = acc + template({
        bg,
        id: item.id,
        title: item.title,
        note: item.note,
        currency: item.currency,
        valueUSD: `<span class="${valueClass}">${money().renderMoney(money().format(item.valueUSD))}</span>`,
        incomeUSD: item.interestRate > 0.01 ? `<span class="${valueClass} text-base ml-2 text-yellow-400">${money().renderMoney(money().format(item.monthIncomeUSD))}</span>` : '',
        rate
      })

      return acc;
    }, '');

    return `<ul class="grid gap-1 grid-cols-2 mx-2 mt-4 pb-24">${list}</ul>`
  }

  const addListeners = () => {
    document.getElementById('content').addEventListener('click', (e) => {
      e.preventDefault()

      const btn = e.target.closest('.asset-button')

      if (btn && btn.id) {
        ModalModule().render(AssetFormModule(btn.id).render)
      }
    });
  }

  const render = () => {
    const assets = storage.assets.get().sort((a, b) => (b ? b.valueUSD : 0) - (a ? a.valueUSD : 0))

    document.getElementById('content').innerHTML = getAssetsList(assets.filter(Boolean))
    addListeners()
  }

  return {
    render,
  }
}