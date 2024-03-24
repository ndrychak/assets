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
    'bg-[#00526C]',
    'bg-[#007787]',
    'bg-[#009C91]',
    'bg-[#48C08B]',
    'bg-[#5E6C9E]',
    'bg-[#B980B3]',
    'bg-[#E28BB2]',
  ]

  const renderLegend = (data) => {
    const legendContainer = document.getElementById('chartLegend')
    const sum = data.data.reduce((a, b) => a + b, 0)
    const legend = data.data.reduce((acc, item, idx) => {
    const gradient = data.profitable[idx] ? 'bg-gradient-to-r from-[#142b2c] to-[#1F4344]' : 'bg-gradient-to-r from-slate-900 to-slate-800'

      acc = acc + `
      <div class="flex items-center rounded-lg ${gradient}">
        <div class="h-10 w-10 m-1 text-center content-center font-bold rounded-lg ${bgColors[idx]}">
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

  const getChartByTypeData = () => {
    const assets = storage.assets.get()
    const groupByTitle = assets.reduce((acc, item) => {
      const index = acc.labels.indexOf(item.title)

      if (index < 0) {
        acc.labels.push(item.title)
        acc.data.push(item.valueUSD)
        acc.profitable.push(!!item.interestRate)
      } else {
        acc.data = acc.data.with(index, acc.data[index] + item.valueUSD)
      }

      return acc
    }, {
      labels: [],
      data: [],
      profitable: [],
    })

    return {
      labels: groupByTitle.labels,
      data: groupByTitle.data,
      profitable: groupByTitle.profitable,
      backgroundColor: bgColors.map((str) => str.match(/(?<=bg-\[).*(?=])/)[0]), 
    }
  }

  const chartByType = (ctx) => {
    const data = getChartByTypeData()

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

  const render = () => {
    document.getElementById('modalContent').innerHTML = `
      <div class="m-auto">
        <canvas id="chartctx" class="-my-28"></canvas>
        <div id="chartLegend" class="grid grid-cols-2 gap-2 mb-2"></div>
      </div>`
    chartByType(document.getElementById('chartctx'))
  }

  return {
    render,
  }
}