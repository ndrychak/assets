const getAssetsList = (data) => {
  const list = data.reduce((acc, item) => {
    const title = item[1];
    const note = item[2];
    const valueInital = Number(item[3]);
    const currency = item[4];
    const interestRate = Number(item[5]);

    const gradient = interestRate ? 'bg-gradient-to-r from-[#142b2c] to-[#1F4344]' : 'bg-gradient-to-r from-slate-900 to-slate-800';
    const rate = interestRate ? `<p class="absolute top-2 right-2 font-medium text-xs text-white">${interestRate}%</p>` : ''
    const valueUSD = currency !== 'USD' ? `<span class="font-normal text-sm opacity-70">${window.currency.format(window.currency.convertTo(valueInital, currency, 'USD'), currency)}</span> ` : ''
    const monthIncomeInitial = interestRate ? window.currency.format(window.currency.getMonthIncome(valueInital, interestRate, currency), currency) : ''
    const monthIncomeUSD = interestRate && (currency !== 'USD') ? `<span class="font-normal text-sm opacity-70">${window.currency.format(window.currency.getMonthIncome(valueInital, interestRate, currency, 'USD'))}</span>` : ''

    acc = acc + window.templates.assetItem({
      gradient,
      title,
      note,
      valueUSD,
      valueInital: window.currency.format(valueInital, currency),
      monthIncomeUSD,
      monthIncomeInitial,
      rate
    })

    return acc;
  }, '');

  return `<ul class="grid gap-2 grid-cols-2 pb-24">${list}</ul>`
}

const renderAssets = () => {
  const assets = window.storage.assets.get().values
  const total = window.currency.getTotalUSD(assets)
  const monthlyUSD = window.currency.getMonthlyTotalUSD(assets)

  document.getElementById('content').innerHTML = window.templates.header(total, monthlyUSD) + getAssetsList(assets) + window.templates.footer()
}

const loginForm = () => {
  document.getElementById('content').innerHTML = window.templates.login()

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
  window.storage.assets.get() ? renderAssets() : loginForm()
});
