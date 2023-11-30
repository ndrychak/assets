import { api } from '../helpers/api.js'

export const FooterModule = (renderAssets) => {
  const template = () => {
    return `
      <footer class="fixed bottom-4 right-4">
        <ul>
          <li>
            <button id="refreshBtn" class="relative rounded-full bg-green-500 w-16 h-16">
              <img src="assets/refresh.png" class="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
            </button>
          </li>
        </ul>
      </footer>`
  }

  const addListeners = () => {
    document.getElementById('refreshBtn').addEventListener('click', (e) => {
      e.preventDefault();
      api.requestSheet().then(() => {
        renderAssets && renderAssets();
      });
    });
  }

  const render = () => {
    document.getElementById('footer').innerHTML = template()
    addListeners()
  }

  return {
    render,
  }
}