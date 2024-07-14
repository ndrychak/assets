import { storage } from '../helpers/storage.js'
import { money } from '../helpers/money.js'

export const ChartModule = () => {
  const chartOptions = {
    hoverOffset: 10,
    circumference: 180,
    rotation: -90,
    radius: 120,
    cutout: '65%',
    borderWidth: 1,
    borderColor: '#000',
    color: '#FFF',
    animation: false,
  }
  const chartPlugins = {
    options: {
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  }
  const bgColors = [
    'bg-[#005f73]',
    'bg-[#0a9396]',
    'bg-[#ee9b00]',
    'bg-[#ca6702]',
    'bg-[#bb3e03]',
    'bg-[#ae2012]',
    'bg-[#9b2226]',
  ]

  const renderLegend = (data) => {
    const legendContainer = document.getElementById('chartLegend')
    const sum = data.data.reduce((a, b) => a + b, 0)
    const legend = data.data.reduce((acc, item, idx) => {
      const gradient = data.profitable[idx] ? 'bg-gradient-to-r from-[#142b2c] to-[#1F4344]' : 'bg-gradient-to-r from-slate-900 to-slate-800'

      acc = acc + `
      <div class="flex items-center rounded-lg ${gradient}">
        <div class="h-10 w-10 m-1 mr-0 text-center content-center font-bold rounded-lg ${bgColors[idx]}">
          ${~~((item / sum) * 100)}%
        </div>
        <div class="flex justify-between grow px-4">
          <span class="font-bold">${data.labels[idx]}</span>${money().format(item)}
        </div>
      </div>`
      return acc
    }, '')

    legendContainer.innerHTML = legend
  }

  const getChartData = () => {
    const assets = storage.assets.get()
    const groupByTitle = assets.reduce((acc, item) => {
      if (!item) {
        return acc
      }

      const index = acc.findIndex(a => a.label === item.title)

      if (index < 0) {
        acc.push({
          label: item.title,
          value: item.valueUSD,
          isProfitable: !!item.interestRate
        })
      } else {
        acc = acc.with(index, {
          label: acc[index].label,       
          value: acc[index].value + item.valueUSD,
          isProfitable: acc[index].isProfitable
        })
      }

      return acc
    }, [])

    groupByTitle.sort((a, b) => b.value - a.value);

    return {
      labels: groupByTitle.map(a => a.label),
      data: groupByTitle.map(a => a.value),
      profitable: groupByTitle.map(a => a.isProfitable),
      backgroundColor: bgColors.map((str) => str.match(/(?<=bg-\[).*(?=])/)[0]), 
    }
  }

  const chartByType = (ctx) => {
    const data = getChartData()

    new Chart(ctx, {
      type: 'doughnut',
      ...chartPlugins,
      data: {
        labels: data.labels,
        datasets: [{
          label: 'value',
          spacing: 6,
          borderRadius: 6,
          data: data.data,
          backgroundColor: data.backgroundColor,
          ...chartOptions,
        }]
      },
    });
    renderLegend(data)
  }

  const chartByCurrency = () => {
    const assets = storage.assets.get()
    const groupByCurrency = assets.reduce((acc, item) => {
      if (!item) {
        return acc
      }

      acc[item.currency] = acc[item.currency] + item.valueUSD
      acc.total = acc.total + item.valueUSD

      return acc
    }, {
      USD: 0,
      UAH: 0,
      EUR: 0,
      total: 0
    })
    
    const chartData = {
      USD: Math.round(groupByCurrency.USD / groupByCurrency.total * 100),
      UAH: Math.round(groupByCurrency.UAH / groupByCurrency.total * 100),
      EUR: Math.round(groupByCurrency.EUR / groupByCurrency.total * 100)
    }

    return `
      <div class="flex h-6 text-center rounded-lg overflow-hidden">
        <span class="min-w-fit px-2 bg-[#31572c]" style="width: ${chartData.USD}%">USD ${chartData.USD}%</span>
        <span class="min-w-fit px-2 bg-[#806020]" style="width: ${chartData.UAH}%">UAH ${chartData.UAH}%</span>
        <span class="min-w-fit px-2 bg-[#023e7d]"  style="width: ${chartData.EUR}%">EUR ${chartData.EUR}%</span>
      </div>`
  }

  const chartByProfit = () => {
    const assets = storage.assets.get()
    const groupByProfit = assets.reduce((acc, item) => {
      if (!item) {
        return acc
      }

      if (!!item.interestRate) {
        acc.profit = acc.profit + item.valueUSD
      } else {
        acc.nonProfit = acc.nonProfit + item.valueUSD
      }

      acc.total = acc.total + item.valueUSD

      return acc
    }, {
      profit: 0,
      nonProfit: 0,
      total: 0,
    })

    console.log('groupByProfit', groupByProfit)
    
    const chartData = {
      profit: Math.round(groupByProfit.profit / groupByProfit.total * 100),
      nonProfit: Math.round(groupByProfit.nonProfit / groupByProfit.total * 100),
    }

    return `
      <div class="flex h-6 text-center rounded-lg overflow-hidden">
        <span class="min-w-fit px-2 bg-gradient-to-r from-[#142b2c] to-[#1F4344]" style="width: ${chartData.profit}%">${chartData.profit}%</span>
        <span class="min-w-fit px-2 bg-gradient-to-r from-slate-900 to-slate-800" style="width: ${chartData.nonProfit}%">${chartData.nonProfit}%</span>
      </div>`
  }

  const render = () => {
    document.getElementById('modalContent').innerHTML = `
      <div class="m-auto">
        <canvas id="chartctx" class="-my-24"></canvas>
        <div id="chartLegend" class="grid grid-cols-2 gap-2 mb-2"></div>

        <div class="mt-4 pt-4 border-t-2 border-t-slate-800">
          ${chartByProfit()}
        </div>
        <div class="mt-4 pt-4 border-t-2 border-t-slate-800">
          ${chartByCurrency()}
        </div>
      </div>`
    chartByType(document.getElementById('chartctx'))
  }

  return {
    render,
  }
}