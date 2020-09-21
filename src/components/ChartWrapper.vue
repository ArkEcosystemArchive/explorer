<template>
  <div class="PriceChart">
    <div
      v-if="hasError || isLoading"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center text-white"
    >
      <p v-if="hasError" class="mb-4">{{ $t("MARKET_CHART.ERROR") }}</p>
      <button :disabled="isLoading" class="items-center mt-4 pager-button" @click="renderChart(1000)">
        <span v-if="!isLoading">{{ $t("MARKET_CHART.RELOAD") }}</span>
        <Loader v-else :data="null" />
      </button>
    </div>

    <div :key="componentKey" :class="{ blur: hasError || isLoading }">
      <div class="flex items-center justify-between px-10 pt-8 pb-4">
        <div class="relative">
          <button
            v-click-outside="closeDropdown"
            class="flex items-center ml-0 chart-tab chart-tab-active"
            @click="toggleDropdown"
          >
            {{ currencyName }} {{ $t(`MARKET_CHART.${priceChartOptions.type.toUpperCase()}`) }}
            <SvgIcon :class="{ 'rotate-180': isOpen }" class="ml-2" name="caret" view-box="0 0 16 16" />
          </button>

          <ul
            v-show="isOpen"
            class="absolute left-0 mt-px overflow-hidden text-sm border rounded bg-theme-content-background shadow-theme"
          >
            <li v-for="type in ['price', 'volume']" :key="type">
              <span class="dropdown-button" @click="setType(type)"
                >{{ currencyName }} {{ $t(`MARKET_CHART.${type.toUpperCase()}`) }}</span
              >
            </li>
          </ul>
        </div>

        <div class="PriceChart__PeriodButtons">
          <template v-for="period in ['day', 'week', 'month', 'quarter', 'year']">
            <button
              :key="period"
              :class="{ 'chart-tab-active': priceChartOptions.period === period }"
              class="transition chart-tab"
              @click="setPeriod(period)"
            >
              {{ $t(`MARKET_CHART.${period.toUpperCase()}`) }}
            </button>
          </template>
        </div>
      </div>

      <PriceChart :chart-data="chartData" :styles="{ height: '308px' }" :options="options" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import CryptoCompareService from "@/services/crypto-compare";
import PriceChart from "@/components/charts/price-chart";

@Component({
  components: {
    PriceChart,
  },
  computed: {
    ...mapGetters("currency", { currencyName: "name" }),
    ...mapGetters("network", ["token"]),
    ...mapGetters("ui", ["priceChartOptions"]),
  },
})
export default class ChartWrapper extends Vue {
  private error: string | null = null;
  private isLoading = false;
  private isOpen = false;
  private componentKey = 0;
  private labels: string[] = [];
  private datasets: any[] = [];
  private options: object = {
    showScale: true,
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      intersect: false,
    },
    animation: {
      duration: 0,
    },
    responsiveAnimationDuration: 0,
    legend: {
      display: false,
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 16,
        bottom: 50,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (value: string, index: number, values: any) => {
              // Skip every second tick
              if (index % 2 === 0) {
                return;
              }

              // @ts-ignore
              return this.readableCurrency(value, 1, null, false);
            },
            fontColor: "#838a9b",
            fontSize: 13,
          },
          position: "right",
          gridLines: {
            display: true,
            color: "#282b38",
            zeroLineColor: "#282b38",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "#282b38",
            zeroLineColor: "#282b38",
          },
          ticks: {
            fontColor: "#838a9b",
            fontSize: 13,
            callback(value, index, values) {
              if (
                ((values.length > 10 && index % 2 !== 0) || (values.length > 360 && index % 3 !== 0)) &&
                index !== 364
              ) {
                return;
              } else {
                return value;
              }
            },
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: "#272936",
      titleFontStyle: "normal",
      titleFontSize: 18,
      titleFontFamily: "'Inter Regular', sans-serif",
      titleMarginBottom: 0,
      cornerRadius: 3,
      bodyFontColor: "#838a9b",
      bodyFontSize: 14,
      xPadding: 14,
      yPadding: 14,
      caretPadding: 20,
      displayColors: false,
      mode: "index",
      intersect: false,
      // borderWidth: 1,
      // borderColor: '#037cff',
      callbacks: {
        // @ts-ignore
        title: (tooltipItem) => this.readableCurrency(tooltipItem[0].yLabel, 1, null, false),
        label: (tooltipItem: any) => "",
      },
    },
  };
  private currencyName: string;
  private token: string;
  private priceChartOptions: { [key: string]: any };

  get chartData() {
    return {
      labels: this.labels,
      datasets: [
        {
          type: "line",
          pointHoverBackgroundColor: "#fff",
          borderColor: "#535972",
          pointHoverBorderColor: "#037cff",
          pointBackgroundColor: "rgba(0,0,0,0)",
          pointBorderColor: "rgba(0,0,0,0)",
          pointHoverRadius: 7,
          pointHoverBorderWidth: 4,
          fill: false,
          data: this.currentDataset,
        },
      ],
    };
  }

  get currentDataset() {
    let property: string;

    switch (this.priceChartOptions.type) {
      case "price": {
        property = "close";
        break;
      }
      case "volume": {
        property = "volumeto";
        break;
      }
    }

    return this.datasets.map((el: { [key: string]: string }) => el[property]);
  }

  get hasError() {
    return !!this.error;
  }

  @Watch("token")
  public onTokenChanged() {
    this.renderChart();
  }

  @Watch("priceChartOptions.period")
  public onPriceChartOptionsPeriodChanged() {
    this.renderChart();
  }

  @Watch("priceChartOptions.type")
  public onPriceChartOptionsTypeChanged() {
    this.renderChart();
  }

  @Watch("currencyName")
  public onCurrencyNameChanged() {
    this.renderChart();
  }

  public mounted() {
    window.addEventListener("resize", this.handleResize);
    this.renderChart();
  }

  private setPeriod(period: string) {
    this.$store.dispatch("ui/setPriceChartOption", { option: "period", value: period });
  }

  private setType(type: string) {
    this.$store.dispatch("ui/setPriceChartOption", { option: "type", value: type });
  }

  private async renderChart(delay = 0) {
    if (!this.datasets.length) {
      this.isLoading = true;
    }

    try {
      // @ts-ignore
      const response = await CryptoCompareService[this.priceChartOptions.period]();
      this.labels = response.labels;
      this.datasets = response.datasets;

      this.error = null;
    } catch (error) {
      this.labels = [];
      this.datasets = [];

      this.error = error;
    } finally {
      setTimeout(() => (this.isLoading = false), delay);
    }
  }

  private handleResize() {
    // trick to re-mount the chart on resize
    // https://stackoverflow.com/questions/47459837/how-to-re-mount-a-component
    this.componentKey++;
  }

  private closeDropdown() {
    this.isOpen = false;
  }

  private toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
</script>

<style scoped>
.PriceChart {
  @apply .relative;
}
</style>
