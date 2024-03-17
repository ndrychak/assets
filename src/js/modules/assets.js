import { storage } from '../helpers/storage.js'
import { money } from '../helpers/money.js'

export const AssetsModule = () => {
  const getAssetsList = (data) => {
    const list = data.reduce((acc, item) => {
      const bg = item.interestRate ? 'bg-gradient-to-r from-[#142b2c] to-[#1F4344]' : 'bg-gradient-to-r from-slate-900 to-slate-800';
      const rate = item.interestRate > 0.01 ? `${item.interestRate}%` : ''
      const valueClass = item.currency !== 'USD' ? 'opacity-40' : ''
      // const monthIncomeUSD = (item.interestRate > 0.01) && (item.currency !== 'USD') ? `<span class="font-normal text-base opacity-40">${money().format(item.monthIncomeUSD)}</span>` : ''
      // const monthIncomeInitial = item.interestRate > 0.01 ? money().format(item.monthIncomeInitial, item.currency) : ''

      acc = acc + template({
        bg,
        title: item.title,
        note: item.note,
        currency: item.currency,
        valueUSD: `<span class="${valueClass}">${money().format(item.valueUSD)}</span>`,
        incomeUSD: item.interestRate > 0.01 ? `<span class="${valueClass} text-base ml-2 text-yellow-400">${money().format(item.monthIncomeUSD)}</span>` : '',
        rate
      })

      return acc;
    }, '');

    return `<ul class="grid gap-2 grid-cols-2 mx-2 mt-4 pb-10">${list}</ul>`
  }

  const render = () => {
    const assets = storage.assets.get().sort((a, b) => b.valueUSD - a.valueUSD);

    document.getElementById('content').innerHTML = getAssetsList(assets);
  }

  const template = ({ bg, title, note, valueUSD, incomeUSD, rate, currency, valueInitial, monthIncomeInitial }) => {
    return `
      <li class="w-full">
        <div class="w-full relative text-left rounded-xl px-4 py-2 ${bg}">
          <p class="text-xl font-bold -mb-2">${title}<span class="text-base float-right">${rate}</span></p>
          <p class="text-base -mb-1">${note}&nbsp;</p>
          <p class="text-xl font-bold">${valueUSD}&nbsp;${incomeUSD}</p>
        </div>
      </li>`
  }

  return {
    render,
  }
}