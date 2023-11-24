window.constants = {
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
      localStorage.setItem(constants.storage.assetsData, JSON.stringify(data));
      return data;
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
