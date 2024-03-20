import { storage } from '../helpers/storage.js'
import { api } from '../helpers/api.js'

export const LoginModule = (renderAll) => {
  const addListeners = () => {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault()
      storage.apiData.set(Object.fromEntries(new FormData(e.target)))
      api().auth(() => {
        api().requestSheet(() => {
          document.getElementById('login').remove()
          renderAll && renderAll();
        })
      })
    });
  }

  const template = () => {
    return `
      <div id="loginWrapper" class="fixed w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form id="loginForm" class="flex flex-col">
          <input name="apiKey" placeholder="API key" value="" type="text" class="h-10 mb-2 p-2 rounded-md text-black" required />
          <input name="clientId" placeholder="Client ID" value="" type="text" class="h-10 mb-2 p-2 rounded-md text-black" required />
          <button class="h-10 mt-4 font-bold underline" type="submit">LOGIN</button>
        </form>
      </div>`
  }

  const render = () => {
    document.getElementById('login').innerHTML = template()
    addListeners()
  }

  return {
    render,
  };
}