<template>
  <div>
    <div class="flex justify-between items-center px-10 py-8">
      <h2 class="text-white m-0 text-xl font-normal">{{ $t("Price in") }} {{ currencyName }}</h2>
      <div>
        <button @click="period('day')"  :class="{ 'chart-tab-active': type === 'day' }" class="chart-tab">{{ $t("Day") }}</button>
        <button @click="period('week')"  :class="{ 'chart-tab-active': type === 'week' }" class="chart-tab">{{ $t("Week") }}</button>
        <button @click="period('month')"  :class="{ 'chart-tab-active': type === 'month' }" class="chart-tab">{{ $t("Month") }}</button>
        <button @click="period('quarter')"  :class="{ 'chart-tab-active': type === 'quarter' }" class="chart-tab">{{ $t("Quarter") }}</button>
        <button @click="period('year')"  :class="{ 'chart-tab-active': type === 'year' }" class="chart-tab">{{ $t("Year") }}</button>
      </div>
    </div>

    <price-chart :chartData="chartData" :options="options" :height="314"></price-chart>
  </div>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'
import PriceChart from '@/components/charts/price-chart'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: {PriceChart},

  data: () => ({
    type: 'day',
    chartData: {},
    options: {
      showScale: true,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 0,
          bottom: 50,
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: (value, index, values) => {
                // Skip every second tick
                if (index % 2 === 0) return

                if ([store.getters['network/token'], 'BTC', 'ETH', 'LTC'].some(c => store.getters['currency/name'].indexOf(c) > -1)) {
                  return store.getters['currency/symbol'] + value.toFixed(8)
                }

                return store.getters['currency/symbol'] + value.toFixed(2)
              },
              fontColor: '#838a9b',
              fontSize: 13,
            },
            gridLines: {
              color: '#282b38',
            },
          },
        ],
        xAxes: [
          {
            // type: 'time',
            // time: {
            //   unit: 'day',
            //   unitStepSize: 1,
            //   displayFormats: {
            //     day: 'MMM D',
            //   },
            // },
            gridLines: {
              display: true,
              color: '#282b38',
            },
            ticks: {
              fontColor: '#838a9b',
              fontSize: 13,
            },
          },
        ],
      },
      tooltips: {
        backgroundColor: '#272936',
        titleFontStyle: 'normal',
        titleFontSize: 18,
        bodyFontFamily: "'Proxima Nova', sans-serif",
        cornerRadius: 3,
        bodyFontColor: '#838a9b',
        bodyFontSize: 14,
        xPadding: 14,
        yPadding: 14,
        displayColors: false,
        mode: 'index',
        intersect: false,
        // borderWidth: 1,
        // borderColor: '#037cff',
        callbacks: {
          title: tooltipItem => {
            const name = store.getters['currency/name']
            const token = store.getters['currency/symbol']

            if ([token, 'BTC', 'ETH', 'LTC'].some(c => name.indexOf(c) > -1)) {
              return `${name} ${Number(tooltipItem[0].yLabel).toFixed(8)}`
            }

            return `${name} ${Number(tooltipItem[0].yLabel).toFixed(2)}`
          },
          label: tooltipItem => ''
          // label: tooltipItem => `BTC ${tooltipItem.yLabel}`
        }
      }
    }
  }),

  computed: {
    ...mapGetters('currency', { currencyName: 'name' }),
  },

  mounted() {
    this.prepareComponent()
  },

  methods: {
    prepareComponent() {
      this.renderChart()

      this.watchCurrencyName()
      this.watchNetworkToken()
    },

    period(type) {
      this.type = type

      this.renderChart()
    },

    async renderChart(type) {
      const response = await CryptoCompareService[this.type]()
      this.chartData = {
        labels: response.labels,
        datasets: [{
          type: 'line',
          pointHoverBackgroundColor: '#fff',
          borderColor: '#535972',
          pointHoverBorderColor: '#037cff',
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
          pointHoverRadius: 5,
          pointHoverBorderWidth: 4,
          fill: false,
          // data: this.chartData.map((point, index) => {
          //   return {
          //     t: this.labels[index],
          //     y: point,
          //   }
          // }),
          data: response.datasets
        }],
      }
    },

    watchCurrencyName() {
      this.$store.watch((state) => state.currency.name, (value) => this.renderChart())
    },

    watchNetworkToken() {
      this.$store.watch((state) => state.network.token, (value) => this.renderChart())
    },
  }
}
</script>
