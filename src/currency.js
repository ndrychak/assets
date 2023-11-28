const format = (price, currency = 'USD', digits = 0) => {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(price).replace(/\s/g, '').replace('UAH', '₴')
}

const convertTo = (total = 0, from = 'UAH', to = 'USD') => total * window.constants.currencyRates[`${from}_${to}`]

const getMonthIncome = (total = 0, interestRate = 0, from, to) => {
  const monthIncome = total * interestRate / 100 / 12;

  return to ? convertTo(monthIncome, from, to) : monthIncome
}

const getTotalUSD = (assets) => format(assets.reduce((sum, asset) => sum + asset.valueUSD, 0))

const getMonthlyTotalUSD = (assets) => {
  const total = assets.reduce((sum, asset) => {
    const monthIncome = getMonthIncome(asset.valueInitial, asset.interestRate, 'USD');

    const currentPrice = asset.currency === 'USD' ? monthIncome : convertTo(monthIncome, asset.currency)

    return sum + currentPrice
  }, 0)

  return format(total)
}

window.currency = {
  format,
  convertTo,
  getMonthIncome,
  getTotalUSD,
  getMonthlyTotalUSD,
}