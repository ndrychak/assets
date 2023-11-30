export const money = () => {
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
    const currencyRates = {
      USD_UAH: 36.020,
      USD_EUR: 0.910,
      EUR_USD: 1.081,
      EUR_UAH: 39.817,
      UAH_USD: 0.027,
      UAH_EUR: 0.024,
      USD_USD: 1,
      EUR_EUR: 1,
      UAH_UAH: 1,
    }

    return total * currencyRates[`${from}_${to}`]
  }

  const getMonthIncome = (total = 0, interestRate = 0, from, to) => {
    const monthIncome = total * interestRate / 100 / 12;
    return to ? convertTo(monthIncome, from, to) : monthIncome
  }

  const getTotalUSD = (assets) => format(assets.reduce((sum, asset) => sum + asset.valueUSD, 0))

  const getMonthlyTotalUSD = (assets) => format(assets.reduce((sum, asset) => sum + asset.monthIncomeUSD, 0))

  const getMonthlyTotalUAH = (assets) => {
    return format(assets.reduce((sum, asset) => {
      return sum + (asset.currency === 'UAH' ? asset.monthIncomeInitial : convertTo(asset.monthIncomeInitial, asset.currency, 'UAH'))
    }, 0), 'UAH')
  }

  return {
    format,
    convertTo,
    getMonthIncome,
    getTotalUSD,
    getMonthlyTotalUSD,
    getMonthlyTotalUAH,
  }
}