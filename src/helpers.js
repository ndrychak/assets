window.constants = {
  sheetId: '1-KdKfoODvbDzFkFMIfCTHYqy3uP6RDexo_chF1pOcQ4',
  storage: {
    apiData: 'api_data',
    assetsData: 'assets_data',
    accessToken: 'access_token',
  },
  currencyRates: {
    USD_UAH: 36.020,
    UAH_USD: 0.027,
    USD_EUR: 0.910,
    EUR_USD: 1.081
  }
}

window.storage = {
  assets: {
    get: () => {
      const data = localStorage.getItem(constants.storage.assetsData);
      return data ? JSON.parse(data) : null;
    },
    set: (data) => {
      const assets = [];

      data.forEach(item => {
        assets.push({
          id: item[0],
          title: item[1],
          note: item[2],
          value: Number(item[3]),
          currency: item[4],
          interestRate: Number(item[5]),
        })
      });

      localStorage.setItem(constants.storage.assetsData, JSON.stringify(assets));
      return assets;
    }
  },
  accessToken: {
    get: () => {
      const token = localStorage.getItem(constants.storage.accessToken);
      return token ? token : null;
    },
    set: (token) => {
      localStorage.setItem(constants.storage.accessToken, token);
      return token;
    }
  },
  apiData: {
    get: () => {
      const data = localStorage.getItem(constants.storage.apiData);
      return data ? JSON.parse(data) : null;
    },
    set: (data) => {
      localStorage.setItem(constants.storage.apiData, JSON.stringify(data));
      return data;
    }
  }
}
