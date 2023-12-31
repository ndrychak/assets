import { storage } from '../helpers/storage.js'
import { api } from '../helpers/api.js'

export const LoginModule = (renderAll) => {
  const tokenCallback = () => {
    const callback = () => {
      document.getElementById('login').remove()
      renderAll && renderAll();
    }
    api().requestSheet(callback)
  }

  const addListeners = () => {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault()
      storage.apiData.set(Object.fromEntries(new FormData(e.target)))
      api().requestToken(tokenCallback)
    });
  }

  const template = () => {
    return `
      <div id="loginWrapper" class="fixed w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form id="loginForm" class="flex flex-col">
          <input name="clientId" placeholder="clientId" value="" type="text" class="h-10 mb-2 p-2 rounded-md text-black" required />
          <button class="h-10 mt-4 bg-green-500 rounded-md" type="submit">LOGIN</button>
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