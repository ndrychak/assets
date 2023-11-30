import { storage } from './storage.js'

export const api = {
  requestSheet: () => {
    return fetch(`https://sheets.googleapis.com/v4/spreadsheets/1-KdKfoODvbDzFkFMIfCTHYqy3uP6RDexo_chF1pOcQ4/values/main`, {
      headers: { Authorization: `Bearer ${storage.accessToken.get()}` }
    })
      .then(resp => resp.json())
      .then(json => {
        return storage.assets.set(json.values);
      })
  },
  requestToken: (callback) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: storage.apiData.get().clientId,
      scope: 'https://www.googleapis.com/auth/drive',
      ux_mode: 'popup',
      callback: (response) => {
        storage.accessToken.set(response.access_token);
        callback(response);
      },
    });

    client.requestAccessToken();
  }
}