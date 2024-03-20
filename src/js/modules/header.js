import { money } from '../helpers/money.js'
import { storage } from '../helpers/storage.js'

export const HeaderModule = () => {
  const template = (total, monthlyUSD, monthlyUAH) => {
    return `
      <header class="m-2 p-4 rounded-xl flex flex-row gap-4 justify-between">
        <div>
          <h1 class="text-xl">Current balance</h1>
          <h2 class="text-3xl font-bold">${total}</h1>
        </div>
        <div>
        <h1 class="text-xl">Income</h1>
        <h2 class="text-3xl font-bold">
          ${monthlyUSD} <span class="text-base font-normal inline-block align-middle">(${monthlyUAH})</span>
        </h1>
        </div>
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