
const getHeader = () => {
  return `
    <header class="mb-3 py-2 px-2">
      <h1 class="text-3xl font-medium">Total $95,000</h1>
      <h2 class="text-2xl font-medium text-yellow-500">Monthly $214 <span class="text-base font-normal inline-block align-middle">($7,900)</span></h2>
    </header>`
}

const getAssetsList = (data) => {
  const list = data.reduce((acc, item) => {
    const gradient = Number(item[5]) ? 'bg-gradient-to-r from-[#142b2c] to-[#1F4344]' : 'bg-gradient-to-r from-slate-900 to-slate-800';
    const rate = Number(item[5]) ? `<p class="absolute top-2 right-2 font-medium text-xs text-white">${item[5]}%</p>` : ''
    const monthly = Number(item[5]) ? Number(item[5]) : ''
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: item[4],
      maximumFractionDigits: 0,
    });
    acc = acc + `
    <li class="w-full">
      <button class="flex flex-col w-full h-24 relative text-left rounded-lg px-2 py-2 ${gradient}">
        <div class="h-10">
          <p class="text-base font-medium">${item[1]}</p>
          <p class="text-sm -mt-1 font-light">${item[2]}</p>
        </div>
        <div>
          <p class="text-base font-medium">${formatter.format(item[3])}</p>
          <p class="text-sm -mt-1 text-yellow-500">${monthly}</p>
          ${rate}
        </div>
      </button>
    </li>`

    return acc;
  }, '');

  return `<ul class="grid gap-2 grid-cols-2 pb-24">${list}</ul>`
}

const getFooter = () => {
  return `
    <footer class="fixed bottom-4 right-4">
      <ul>
        <li>
          <button class="rounded-full text-4xl bg-green-500 w-16 h-16">+</button>
        </li>
      </ul>
    </footer>`
}

const renderAssets = () => {
  const assetsData = window.storage.assets.get().values
  console.log('assetsData', assetsData)
  document.getElementById('content').innerHTML = getHeader() + getAssetsList(assetsData) + getFooter()
}

const loginForm = () => {
  document.getElementById('content').innerHTML = `
      <div id="initialSetup" class="fixed w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <form id="loginForm" class="flex flex-col">
          <input name="clientId" placeholder="clientId" value="" type="text" class="h-10 mb-2 p-2 rounded-md text-black" required />
          <button class="h-10 mt-4 bg-green-500 rounded-md" type="submit">LOGIN</button>
        </form>
      </div>`

  let loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.storage.apiData.set(Object.fromEntries(new FormData(e.target)))
    document.getElementById('initialSetup').setAttribute('hidden', true);
    requestTokenAndSheet();
  });
}

const requestSheet = () => {
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1-KdKfoODvbDzFkFMIfCTHYqy3uP6RDexo_chF1pOcQ4/values/main', {
    headers: { Authorization: `Bearer ${window.storage.accessToken.get()}` }
  })
    .then(resp => resp.json())
    .then(json => {
      window.storage.assets.set(json);
      renderAssets();
    })
}

const requestTokenAndSheet = () => {
  const client = google.accounts.oauth2.initTokenClient({
    client_id: window.storage.apiData.get().clientId,
    scope: 'https://www.googleapis.com/auth/drive',
    ux_mode: 'popup',
    callback: (response) => {
      window.storage.accessToken.set(response.access_token);
      requestSheet();
    },
  });

  client.requestAccessToken();
}

addEventListener('DOMContentLoaded', () => {
  !window.storage.assets.get() ? loginForm() : renderAssets()
});
