import { money } from '../helpers/money.js'
import { storage } from '../helpers/storage.js'

export const HeaderModule = () => {
  const template = (total, monthlyUSD, monthlyUAH) => {
    return `
      <header class="mb-3 py-2 px-2 flex flex-row justify-between items-center">
        <h1 class="text-3xl font-medium">${total}</h1>
        <h2 class="text-2xl font-medium text-yellow-500">
          ${monthlyUSD} <span class="text-base font-normal inline-block align-middle">(${monthlyUAH})</span>
        </h2>
      </header>`
  }

  const render = () => {
    const assets = storage.assets.get()

    document.getElementById('header').innerHTML = template(
      money().getTotalUSD(assets),
      money().getMonthlyTotalUSD(assets),
      money().getMonthlyTotalUAH(assets)
    );
  }

  return {
    render,
  }
}