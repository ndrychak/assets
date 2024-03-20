import { storage } from './storage.js'

export const api = () => {
  async function initializeGapiClient(callback) {
    await gapi.client.init({
      apiKey: '',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    });

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: storage.apiData.get().clientId,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      callback: ''
    });

    tokenClient.callback = async (response) => {
      if (response.error !== undefined) {
        throw (response);
      }
     
      storage.accessToken.set(response.access_token);
      callback(response);
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  const auth = (callback) => {
    gapi.load('client', () => initializeGapiClient(callback));
  }

  async function getAssets() {
    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1-KdKfoODvbDzFkFMIfCTHYqy3uP6RDexo_chF1pOcQ4',
        range: 'main',
      });
    } catch (err) {
      console.error('err', err)
      return;
    }

    return response.result
  }

  const requestSheet = (callback) => {
    return getAssets()
      .then(sheet => {
        storage.assets.set(sheet.values);
        callback && callback()
    
        return storage.assets.get();
      })
  }

  const addAsset = () => {    

  }

  return {
    auth,
    requestSheet,
    addAsset,
  }
}