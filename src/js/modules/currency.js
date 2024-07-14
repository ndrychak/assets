import { storage } from '../helpers/storage.js'
import { money } from '../helpers/money.js'

export const CurrencyModule = () => {
  const renderInput = (name, value = 1, label = '') => {
    return `
    <span class="w-[21%] shrink-0 content-center -mr-4">${label}:</span>
    <input name="${name}" value="${value}" type="text" class="h-10 w-[26%] p-2 rounded-md text-black" required />`
  }

  const render = () => {
    document.getElementById('modalContent').innerHTML = 
    `<div id="currencyFormWrapper" class="fixed w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form id="currencyForm" class="flex flex-col gap-2">
        <div class="flex gap-4">
          ${renderInput('USD_UAH', 1, 'USD/UAH')}
          ${renderInput('UAH_USD', 1, 'UAH/USD')}
        </div>
        <div class="flex gap-4">
          ${renderInput('EUR_UAH', 1, 'EUR/UAH')}
          ${renderInput('UAH_EUR', 1, 'UAH/EUR')}
        </div>
        <div class="flex gap-4">
          ${renderInput('USD_EUR', 1, 'USD/EUR')}
          ${renderInput('EUR_USD', 1, 'EUR/USD')}
        </div>
        <div class="flex mt-4 justify-between">
        <button class="px-5 py-3 font-bold rounded-xl bg-[#1F4344] m-auto" type="button" id="btnUpdateCurrency">UPDATE</button>
        </div>
      </form>
  </div>`
  }

  return {
    render,
  }
}