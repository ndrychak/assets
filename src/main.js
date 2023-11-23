addEventListener('DOMContentLoaded', () => {
  const API_DATA = localStorage.getItem('API_DATA');

  if (API_DATA) {
    function start() {
      const apiData = JSON.parse(API_DATA);

      gapi.client.init({
        apiKey: apiData.apiKey,
        clientId: apiData.clientId,
        scope: 'https://www.googleapis.com/auth/drive'
      }).then(() => {
        return gapi.client.request({
          'path': 'https://sheets.googleapis.com/v4/spreadsheets/1-KdKfoODvbDzFkFMIfCTHYqy3uP6RDexo_chF1pOcQ4',
        })
      }).then(response => {
        console.log(JSON.stringify(response.result));
        console.log(response.result);
      }, reason => {
        console.log(reason);
      });
    };

    gapi.load('client', start);
  } else {
    document.getElementById('content').innerHTML = `
      <div id="initialSetup" class="fixed w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <form id="loginForm" class="flex flex-col">
          <input name="apiKey" placeholder="apiKey" value="" type="text" class="h-10 mb-2 p-2 text-black" required />
          <input name="clientId" placeholder="clientId" value="" type="text" class="h-10 mb-2 p-2 text-black" required />
          <button class="bg-green-500 h-10 mt-4" type="submit">LOGIN</button>
        </form>
      </div>`

    let loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('API_DATA', JSON.stringify(Object.fromEntries(new FormData(e.target))))
      document.getElementById('initialSetup').setAttribute('hidden', true);
    });
  }
});
