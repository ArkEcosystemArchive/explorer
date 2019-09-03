<template>
  <div class="PriceChart">
    <div
      v-if="hasError || isLoading"
      class="absolute inset-0 flex flex-col items-center justify-center text-white z-10"
    >
      <p
        v-if="hasError"
        class="mb-4"
      >
        {{ $t('MARKET_CHART.ERROR') }}
      </p>
      <button
        :disabled="isLoading"
        class="mt-4 pager-button items-center"
        @click="renderChart(1000)"
      >
        <span v-if="!isLoading">{{ $t('MARKET_CHART.RELOAD') }}</span>
        <Loader
          v-else
          :data="null"
        />
      </button>
    </div>

    <div
      :key="componentKey"
      :class="{ 'blur': hasError || isLoading }"
    >
      <div class="flex justify-between items-center px-10 pt-8 pb-4">
        <div class="relative">
          <button
            v-click-outside="closeDropdown"
            class="chart-tab chart-tab-active flex items-center ml-0"
            @click="toggleDropdown"
          >
            {{ currencyName }} {{ $t(`MARKET_CHART.${priceChartOptions.type.toUpperCase()}`) }}
            <svg
              :class="{ 'rotate-180': isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current ml-2"
              viewBox="0 0 20 20"
              width="16px"
              height="16px"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>

          <ul
            v-show="isOpen"
            class="absolute left-0 mt-px bg-theme-content-background shadow-theme rounded border overflow-hidden text-sm"
          >
            <li
              v-for="type in ['price', 'volume']"
              :key="type"
            >
              <span
                class="dropdown-button"
                @click="setType(type)"
              >
                {{ currencyName }} {{ $t(`MARKET_CHART.${type.toUpperCase()}`) }}
              </span>
            </li>
          </ul>
        </div>

        <div class="PriceChart__PeriodButtons">
          <template v-for="period in ['day', 'week', 'month', 'quarter', 'year']">
            <button
              :key="period"
              :class="{ 'chart-tab-active': priceChartOptions.period === period }"
              class="chart-tab transition"
              @click="setPeriod(period)"
            >
              {{ $t(`MARKET_CHART.${period.toUpperCase()}`) }}
            </button>
          </template>
        </div>
      </div>

      <PriceChart
        :chart-data="chartData"
        :styles="{ height: '308px' }"
        :options="options"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'
import PriceChart from '@/components/charts/price-chart'
import { mapGetters } from 'vuex'

export default {
  components: {
    PriceChart
  },

  data: vm => ({
    error: null,
    isLoading: false,
    isOpen: false,
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
          top: 16,
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

                return vm.readableCurrency(value, 1, null, false)
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
          title: tooltipItem => vm.readableCurrency(tooltipItem[0].yLabel, 1, null, false),
          label: tooltipItem => ''
        }
      }
    }
  }),

  computed: {
    ...mapGetters('currency', { currencyName: 'name' }),
    ...mapGetters('network', ['token']),
    ...mapGetters('ui', ['priceChartOptions']),

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
          data: this.currentDataset
        }]
      }
    },

    currentDataset () {
      let property

      switch (this.priceChartOptions.type) {
        case 'price':
        {
          property = 'close'
          break
        }
        case 'volume':
        {
          property = 'volumeto'
          break
        }
      }

      return this.datasets.map(el => el[property])
    },

    hasError () {
      return !!this.error
    }
  },

  watch: {
    token () {
      this.renderChart()
    },

    'priceChartOptions.period' () {
      this.renderChart()
    },

    'priceChartOptions.type' () {
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
      this.$store.dispatch('ui/setPriceChartOption', { option: 'period', value: period })
    },

    setType (type) {
      this.$store.dispatch('ui/setPriceChartOption', { option: 'type', value: type })
    },

    async renderChart (delay = 0) {
      if (!this.datasets.length) {
        this.isLoading = true
      }

      try {
        const response = await CryptoCompareService[this.priceChartOptions.period]()
        this.labels = response.labels
        this.datasets = response.datasets

        this.error = null
      } catch (error) {
        this.labels = []
        this.datasets = []

        this.error = error
      } finally {
        setTimeout(() => (this.isLoading = false), delay)
      }
    },

    handleResize () {
      // trick to re-mount the chart on resize
      // https://stackoverflow.com/questions/47459837/how-to-re-mount-a-component
      this.componentKey++
    },

    closeDropdown () {
      this.isOpen = false
    },

    toggleDropdown () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.PriceChart {
  @apply .relative
}
</style>
