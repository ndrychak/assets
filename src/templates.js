const header = (total, monthlyUSD) => {
  return `
    <header class="mb-3 py-2 px-2 flex flex-row justify-between items-center">
      <h1 class="text-3xl font-medium">${total}</h1>
      <h2 class="text-2xl font-medium text-yellow-500">${monthlyUSD} <span class="text-base font-normal inline-block align-middle">($7,900)</span></h2>
    </header>`
}

const footer = () => {
  return `
    <footer class="fixed bottom-4 right-4">
      <ul>
        <li>
          <button id="refreshBtn" class="relative rounded-full bg-green-500 w-16 h-16">
            <img src="assets/refresh.png" class="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
          </button>
        </li>
      </ul>
    </footer>`
}

const login = () => {
  return `
    <div id="initialSetup" class="fixed w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form id="loginForm" class="flex flex-col">
        <input name="clientId" placeholder="clientId" value="" type="text" class="h-10 mb-2 p-2 rounded-md text-black" required />
        <button class="h-10 mt-4 bg-green-500 rounded-md" type="submit">LOGIN</button>
      </form>
    </div>`
}

const assetItem = ({ gradient, title, note, valueUSD, valueInital, monthIncomeUSD, monthIncomeInitial, rate }) => {
  return `
    <li class="w-full">
      <button class="flex flex-col w-full h-[88px] relative text-left rounded-lg px-2 py-1 ${gradient}">
        <div class="h-10">
          <p class="text-base font-medium">${title}</p>
          <p class="text-sm -mt-1 font-light">${note}</p>
        </div>
        <div>
          <p class="text-base font-medium">${valueUSD}${valueInital}</p>
          <p class="text-sm -mt-1 font-medium text-yellow-500">${monthIncomeUSD} ${monthIncomeInitial}</p>
          ${rate}
        </div>
      </button>
    </li>`
}

window.templates = {
  header: header,
  footer: footer,
  login: login,
  assetItem: assetItem,
}