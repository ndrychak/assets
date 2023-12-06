import { api } from '../helpers/api.js'

export const FooterModule = (renderAssets) => {
  const template = () => {
    const buttonStyles = 'relative w-20 h-10 rounded-t-lg text-xs bg-gradient-to-r from-[#1E293B] to-[#40435C]'
    const imageStyles = 'absolute w-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'

    return `
      <ul class="fixed flex gap-2 bottom-0 right-4">
        <li>
          <button id="chartsBtn" class="${buttonStyles}">
            <img src="assets/chart.png" class="${imageStyles}"/>
          </button>  
        </li>
        <li>
        <button id="refreshBtn" class="${buttonStyles}">
          <img src="assets/refresh.png" class="${imageStyles}"/>
        </button>
      </li>
    </ul>`
  }

  const addListeners = () => {
    document.getElementById('refreshBtn').addEventListener('click', (e) => {
      e.preventDefault();
      api.requestSheet().then(() => {
        renderAssets && renderAssets();
      });
    });

    document.getElementById('chartsBtn').addEventListener('click', (e) => {
      e.preventDefault();
      

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