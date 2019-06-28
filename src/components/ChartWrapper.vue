<template>
  <div class="relative">
    <div
      v-if="hasError"
      class="absolute inset-0 flex flex-col items-center justify-center text-white z-10"
    >
      <p class="mb-4">
        {{ $t('The chart data could not be loaded') }}
      </p>
      <button
        :disabled="isLoading"
        class="mt-4 pager-button items-center"
        @click="renderChart()"
      >
        <span v-if="!isLoading">{{ $t('Reload chart') }}</span>
        <Loader
          v-else
          :data="null"
        />
      </button>
    </div>

    <div
      :key="componentKey"
      :class="{ 'blur': hasError }"
    >
      <div class="flex justify-between items-center px-10 py-8">
        <h2 class="text-white m-0 text-xl font-normal">
          {{ $t("Price in") }} {{ currencyName }}
        </h2>
        <div>
          <template v-for="period in ['day', 'week', 'month', 'quarter', 'year']">
            <button
              :key="period"
              :class="{ 'chart-tab-active': currentPeriod === period }"
              class="chart-tab"
              @click="setPeriod(period)"
            >
              {{ $t(capitalize(period)) }}
            </button>
          </template>
        </div>
      </div>

      <PriceChart
        :chart-data="chartData"
        :options="options"
        :height="314"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'
import PriceChart from '@/components/charts/price-chart'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: {
    PriceChart
  },

  data: () => ({
    error: null,
    isLoading: false,
    componentKey: 0,
    labels: [],
    datasets: [],
    options: {
      showScale: true,
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        intersect: false
      },
      animation: {
        duration: 0
      },
      responsiveAnimationDuration: 0,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 0,
          bottom: 50
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
              fontSize: 13
            },
            gridLines: {
              color: '#282b38'
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
              color: '#282b38'
            },
            ticks: {
              fontColor: '#838a9b',
              fontSize: 13
            }
          }
        ]
      },
      tooltips: {
        backgroundColor: '#272936',
        titleFontStyle: 'normal',
        titleFontSize: 18,
        titleFontFamily: "'Proxima Nova Regular', sans-serif",
        titleMarginBottom: 0,
        cornerRadius: 3,
        bodyFontColor: '#838a9b',
        bodyFontSize: 14,
        xPadding: 14,
        yPadding: 14,
        caretPadding: 20,
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
    ...mapGetters('network', ['token']),
    ...mapGetters('ui', { currentPeriod: 'priceChartPeriod' }),

    chartData () {
      return {
        labels: this.labels,
        datasets: [{
          type: 'line',
          pointHoverBackgroundColor: '#fff',
          borderColor: '#535972',
          pointHoverBorderColor: '#037cff',
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
          pointHoverRadius: 7,
          pointHoverBorderWidth: 4,
          fill: false,
          data: this.datasets
        }]
      }
    },

    hasError () {
      return !!this.error
    }
  },

  watch: {
    token () {
      this.renderChart()
    },

    currencyName () {
      this.renderChart()
    }
  },

  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.renderChart()
  },

  methods: {
    setPeriod (period) {
      this.$store.dispatch('ui/setPriceChartPeriod', period)

      if (this.token) {
        this.renderChart()
      }
    },

    async renderChart (delay = false) {
      this.isLoading = true

      try {
        const response = await CryptoCompareService[this.currentPeriod]()
        this.labels = response.labels
        this.datasets = response.datasets

        this.error = null
      } catch (error) {
        this.labels = []
        this.datasets = []

        this.error = error
      } finally {
        this.isLoading = false
      }
    },

    handleResize () {
      // trick to re-mount the chart on resize
      // https://stackoverflow.com/questions/47459837/how-to-re-mount-a-component
      this.componentKey++
    }
  }
}
</script>

<style>
.blur {
  filter: blur(4px)
}
</style>
