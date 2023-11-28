const getAssetsList = (data) => {
  const list = data.reduce((acc, item) => {
    const valueUSD = window.currency.format(window.currency.convertTo(item.value, item.currency, 'USD'), item.currency);
    const monthIncomeUSD = window.currency.format(window.currency.getMonthIncome(item.value, item.interestRate, item.currency, 'USD'));
    const gradient = item.interestRate ? 'bg-gradient-to-r from-[#142b2c] to-[#1F4344]' : 'bg-gradient-to-r from-slate-900 to-slate-800';
    const rate = item.interestRate ? `<p class="absolute top-2 right-2 font-medium text-xs text-white">${item.interestRate}%</p>` : ''
    const valueUSDRender = item.currency !== 'USD' ? `<span class="font-normal text-sm opacity-70">${valueUSD}</span> ` : ''
    const monthIncomeInitial = item.interestRate ? window.currency.format(window.currency.getMonthIncome(item.value, item.interestRate, item.currency), item.currency) : ''
    const monthIncomeUSDRender = item.interestRate && (item.currency !== 'USD') ? `<span class="font-normal text-sm opacity-70">${monthIncomeUSD}</span>` : ''

    acc = acc + window.templates.assetItem({
      gradient,
      title: item.title,
      note: item.note,
      valueUSD: valueUSDRender,
      valueInital: window.currency.format(item.value, item.currency),
      monthIncomeUSD: monthIncomeUSDRender,
      monthIncomeInitial,
      rate
    })

    return acc;
  }, '');

  return `<ul class="grid gap-2 grid-cols-2 pb-24">${list}</ul>`
}

const renderAssets = () => {
  const assets = window.storage.assets.get()
  const total = window.currency.getTotalUSD(assets)
  const monthlyUSD = window.currency.getMonthlyTotalUSD(assets)

  document.getElementById('content').innerHTML = window.templates.header(total, monthlyUSD) + getAssetsList(assets) + window.templates.footer()

  const refreshBtn = document.getElementById('refreshBtn');

  refreshBtn.addEventListener('click', (e) => {
    e.preventDefault();
    requestSheet();
  });
}

const loginForm = () => {
  document.getElementById('content').innerHTML = window.templates.login()

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.storage.apiData.set(Object.fromEntries(new FormData(e.target)))
    document.getElementById('initialSetup').setAttribute('hidden', true);
    requestTokenAndSheet();
  });
}

const requestSheet = () => {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${window.constants.sheetId}/values/main`, {
    headers: { Authorization: `Bearer ${window.storage.accessToken.get()}` }
  })
    .then(resp => resp.json())
    .then(json => {
      window.storage.assets.set(json.values);
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
