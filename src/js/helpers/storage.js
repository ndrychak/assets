import { money } from './money.js'

export const storage = {
  assets: {
    get: () => {
      const data = localStorage.getItem('assets_data');
      return data ? JSON.parse(data) : null;
    },
    set: (data) => {
      const assets = [];

      data.forEach(item => {
        const valueInitial = Number(item[3]);
        const currency = item[4];
        const interestRate = Number(item[5]);

        assets.push({
          id: item[0],
          title: item[1],
          note: item[2],
          valueInitial,
          valueUSD: money().convertTo(valueInitial, currency, 'USD'),
          currency,
          interestRate,
          monthIncomeInitial: interestRate ? money().getMonthIncome(valueInitial, interestRate) : 0,
          monthIncomeUSD: interestRate ? money().getMonthIncome(valueInitial, interestRate, currency, 'USD') : 0,
        })
      });

      localStorage.setItem('assets_data', JSON.stringify(assets));
      return assets;
    }
  },
  accessToken: {
    get: () => {
      const token = localStorage.getItem('access_token');
      return token ? token : null;
    },
    set: (token) => {
      localStorage.setItem('access_token', token);
      return token;
    }
  },
  apiData: {
    get: () => {
      const data = localStorage.getItem('api_data');
      return data ? JSON.parse(data) : null;
    },
    set: (data) => {
      localStorage.setItem('api_data', JSON.stringify(data));
      return data;
    }
  }
}