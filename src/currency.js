const format = (price, currency = 'USD', digits = 0) => {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(price).replace(/\s/g, '').replace('UAH', '₴')
}

const getMonthIncome = (total = 0, interestRate = 0, from, to) => {
  if (to) {
    return convertTo(total * interestRate / 100 / 12, from, to)
  } else {
    return format(total * interestRate / 100 / 12, from)
  }
}

const convertTo = (total = 0, from = 'UAH', to = 'USD') => {
  return format(total * window.constants.currencyRates[`${from}_${to}`], to)
}

// const convertPrice = (total: number, currency: string, allRates: []) => {
//   return total / allRates.find(item => item.sellId === currency)?.sell
// }

const getTotalPrimary = (assets, primaryCurrency, rates) => {
  return assets.reduce((sum, currentItem) =>
    sum + Number(((currentItem.currency === primaryCurrency) ? currentItem.value : convertPrice(currentItem.value, currentItem.currency, rates))), 0)
}

const getTotalIncomePrimary = (assets, primaryCurrency, rates) => {
  return assets.reduce((sum, currentItem) => {
    const monthIncome = getMonthIncome(currentItem.value, currentItem.monthIncomeType, currentItem.monthIncome)
    return sum + Number(((currentItem.currency === primaryCurrency) ? monthIncome : convertPrice(monthIncome, currentItem.currency, rates)))
  }, 0)
}

const getTotalIncomeUAH = (assets, primaryCurrency, rates) => {
  return assets.reduce((sum, currentItem) => {
    const monthIncome = getMonthIncome(currentItem.value, currentItem.monthIncomeType, currentItem.monthIncome)
    return sum + Number(((currentItem.currency !== primaryCurrency) ? monthIncome : convertToUAH(Number(monthIncome))))
  }, 0)
}

window.currency = {
  format: format,
  convertTo: convertTo,
  getMonthIncome: getMonthIncome,
}