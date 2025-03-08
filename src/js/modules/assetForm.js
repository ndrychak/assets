import { api } from '../helpers/api.js'
import { storage } from '../helpers/storage.js'
import { renderDynamic } from '../helpers/render.js'

export const AssetFormModule = (id) => {
  const addListeners = () => {
    const btnAdd = document.getElementById('btnAddAsset')
    const btnEdit = document.getElementById('btnEditAsset')
    const btnDelete = document.getElementById('btnDeleteAsset')
    const callback = () => {
      document.getElementById('modal').innerHTML = ''
      renderDynamic();
    }

    btnAdd && btnAdd.addEventListener('click', (e) => {
      e.preventDefault()
      api().addAsset(Object.fromEntries(new FormData(document.getElementById('assetForm'))), callback)
    });

    btnEdit && btnEdit.addEventListener('click', (e) => {
      e.preventDefault()
      api().updateAsset(id, Object.fromEntries(new FormData(document.getElementById('assetForm'))), callback)
    });

    btnDelete && btnDelete.addEventListener('click', (e) => {
      e.preventDefault()
      api().deleteAsset(id, callback)
    });
  }

  const renderInput = (name, value = '', placeholder) => {
    return `<input name="${name}" placeholder="${placeholder}" value="${value}" type="text" class="h-10 flex-grow mb-2 p-2 rounded-md text-black" required />`
  }

  const renderButton = (type) => {
    const className = 'px-5 py-3 font-bold underline'
    let btn

    switch (type) {
      case 'add':
        btn = `<button class="${className} m-auto" type="button" id="btnAddAsset">ADD NEW ASSET</button>`
        break
      case 'edit':
        btn = `<button class="${className}" type="button" id="btnEditAsset">EDIT ASSET</button>`
        break
      case 'delete': 
        btn = `<button class="${className} text-[#8d0801]" type="button" id="btnDeleteAsset">DELETE</button>`
        break
    }

    return btn
  }

  const render = () => {
    const editAsset = storage.assets.get().find(asset => (asset ? asset.id === id : null)) || {}

    document.getElementById('modalContent').innerHTML = `
      <div id="assetFormWrapper" class="w-4/5 m-auto pt-10">
        <form id="assetForm" class="flex flex-col">
          ${renderInput('title', editAsset.title, 'Title')}
          ${renderInput('note', editAsset.note, 'Note')}
          <div class="flex flex-row gap-2">
            ${renderInput('valueInitial', editAsset.valueInitial, 'Value')}
            <select name="currency" class="h-10 mb-2 p-2 rounded-md text-black">
              <option value="USD" ${editAsset.currency === 'USD' || !editAsset.currency ? 'selected' : ''}>USD</option>
              <option value="EUR" ${editAsset.currency === 'EUR' ? 'selected' : ''}>EUR</option>
              <option value="UAH" ${editAsset.currency === 'UAH' ? 'selected' : ''}>UAH</option>
            </select>
          </div>
          ${renderInput('interestRate', editAsset.interestRate, 'Interest Rate')}
          <div class="flex mt-4 justify-between">
            ${id ? `${renderButton('delete')}${renderButton('edit')}` : renderButton('add')}
          </div>
        </form>
      </div>`

      addListeners()
  }

  return {
    render,
  }
}