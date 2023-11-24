const format = (price, currency = 'USD', digits = 0) => {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(price).replace(/\s/g, '').replace('UAH', '₴')
}

const convertTo = (total = 0, from = 'UAH', to = 'USD') => {
  return total * window.constants.currencyRates[`${from}_${to}`]
}

const getMonthIncome = (total = 0, interestRate = 0, from, to) => {
  const monthIncome = total * interestRate / 100 / 12;

  return to ? convertTo(monthIncome, from, to) : monthIncome
}

const getTotalUSD = (assets) => {
  const total = assets.reduce((sum, asset) => {
    const currentPrice = asset[4] === 'USD' ? Number(asset[3]) : convertTo(Number(asset[3]), asset[4])
    return sum + currentPrice
  }, 0)

  return format(total)
}

const getMonthlyTotalUSD = (assets) => {
  const total = assets.reduce((sum, asset) => {
    const monthIncome = getMonthIncome(Number(asset[3]), Number(asset[5]), 'USD');
    const currentPrice = asset[4] === 'USD' ? monthIncome : convertTo(monthIncome, asset[4])

    return sum + currentPrice
  }, 0)

  return format(total)
}

window.currency = {
  format: format,
  convertTo: convertTo,
  getMonthIncome: getMonthIncome,
  getTotalUSD: getTotalUSD,
  getMonthlyTotalUSD: getMonthlyTotalUSD,
}