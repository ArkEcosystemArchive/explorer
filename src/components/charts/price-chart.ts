import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,

  mixins: [mixins.reactiveProp],

  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    // @ts-ignore
    this.renderChart(this.chartData, this.options);
  },
};
