import { storage } from '../helpers/storage.js'
import { money } from '../helpers/money.js'

export const AssetsModule = () => {
  const getAssetsList = (data) => {
    const list = data.reduce((acc, item) => {
      const gradient = item.interestRate ? 'bg-gradient-to-r from-[#142b2c] to-[#1F4344]' : 'bg-gradient-to-r from-slate-900 to-slate-800';
      const rate = item.interestRate > 0.01 ? `<p class="absolute top-2 right-2 font-medium text-xs text-white">${item.interestRate}%</p>` : ''
      const valueUSD = item.currency !== 'USD' ? `<span class="font-normal text-sm opacity-70">${money().format(item.valueUSD)}</span> ` : ''
      const monthIncomeInitial = item.interestRate > 0.01 ? money().format(item.monthIncomeInitial, item.currency) : ''
      const monthIncomeUSD = (item.interestRate > 0.01) && (item.currency !== 'USD') ? `<span class="font-normal text-sm opacity-70">${money().format(item.monthIncomeUSD)}</span>` : ''

      acc = acc + template({
        gradient,
        title: item.title,
        note: item.note,
        valueUSD,
        valueInitial: money().format(item.valueInitial, item.currency),
        monthIncomeUSD,
        monthIncomeInitial,
        rate
      })

      return acc;
    }, '');

    return `<ul class="grid gap-2 grid-cols-2 pb-24">${list}</ul>`
  }

  const render = () => {
    const assets = storage.assets.get().sort((a, b) => b.valueUSD - a.valueUSD);

    document.getElementById('content').innerHTML = getAssetsList(assets);
  }

  const template = ({ gradient, title, note, valueUSD, valueInitial, monthIncomeUSD, monthIncomeInitial, rate }) => {
    return `
      <li class="w-full">
        <button class="flex flex-col w-full h-[88px] relative text-left rounded-lg px-2 py-1 ${gradient}">
          <div class="h-10">
            <p class="text-base font-medium">${title}</p>
            <p class="text-sm -mt-1 font-light">${note}</p>
          </div>
          <div>
            <p class="text-base font-medium">${valueUSD}${valueInitial}</p>
            <p class="text-sm -mt-1 font-medium text-yellow-500">${monthIncomeUSD} ${monthIncomeInitial}</p>
            ${rate}
          </div>
        </button>
      </li>`
  }

  return {
    render,
  }
}