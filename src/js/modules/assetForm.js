import { api } from '../helpers/api.js'
import { AssetsModule } from './assets.js'
import { HeaderModule } from './header.js'

export const AssetFormModule = () => {
  const addListeners = () => {
    document.getElementById('assetForm').addEventListener('submit', (e) => {
      e.preventDefault()
      
      api().addAsset(Object.fromEntries(new FormData(e.target)), () => {
        document.getElementById('modal').innerHTML = ''

        HeaderModule().render()
        AssetsModule().render()

        const html = document.getElementById('html')
        const content = document.getElementById('content')
        html.classList.remove(['overscroll-none'])
        content.classList.remove(...['blur-[1px]', 'brightness-50'])
      })
    });
  }

  const renderInput = (name, placeholder) => {
    return `<input name="${name}" placeholder="${placeholder}" value="" type="text" class="h-10 mb-2 p-2 rounded-md text-black" required />`
  }

  const render = () => {
    document.getElementById('modalContent').innerHTML = `
      <div id="assetFormWrapper" class="fixed w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form id="assetForm" class="flex flex-col">
          ${renderInput('title', 'Title')}
          ${renderInput('note', 'Note')}
          ${renderInput('valueInitial', 'Value')}
          <select name="currency" class="h-10 mb-2 p-2 rounded-md text-black">
            <option value="USD" selected>USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
          ${renderInput('interestRate', 'Interest Rate')}
          <button class="h-10 mt-4 font-bold underline" type="submit">ADD NEW ASSET</button>
        </form>
      </div>`
      addListeners()
  }

  return {
    render,
  }
}