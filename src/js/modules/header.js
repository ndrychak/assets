import { money } from '../helpers/money.js'
import { storage } from '../helpers/storage.js'
import { renderDynamic } from '../helpers/render.js'

export const HeaderModule = () => {
  const template = (total, monthlyUSD, monthlyUAH) => {
    return `
      <header class="m-2 p-4 flex flex-row gap-4 justify-between">
        <button id="togglePrivacy" class="text-left">
          <h1 class="text-xl">Balance</h1>
          <h2 class="text-3xl font-bold">${money().renderMoney(total)}</h1>
        </button>
        <button id="toggleIncome" class="text-right">
          <h1 class="text-xl">Income</h1>
          <h2 class="text-3xl font-bold">
            <span id="toggleIncomeUSD">${money().renderMoney(monthlyUSD)}</span>
            <span id="toggleIncomeUAH" class="hidden">${money().renderMoney(monthlyUAH)}</span>
          </h1>
        </button>
      </header>`
  }

  const addListeners = () => {
    document.getElementById('toggleIncome').addEventListener('click', (e) => {
      e.preventDefault()
      document.getElementById('toggleIncomeUSD').classList.toggle('hidden')
      document.getElementById('toggleIncomeUAH').classList.toggle('hidden')
    });
    document.getElementById('togglePrivacy').addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.setItem('isPrivate', localStorage.getItem('isPrivate') ? '' : true);
      renderDynamic();
    });
  }

  const render = () => {
    const assets = storage.assets.get()

    document.getElementById('header').innerHTML = template(
      money().getTotalUSD(assets),
      money().getMonthlyTotalUSD(assets),
      money().getMonthlyTotalUAH(assets)
    );

    addListeners()
  }

  return {
    render,
  }
}