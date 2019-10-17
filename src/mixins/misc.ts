import moment from "moment";
import store from "@/store";

const locale = store.getters["ui/locale"];

export default {
  methods: {
    readableTimestamp(value: number): string {
      return moment
        .unix(value)
        .local()
        .format("L LTS");
    },

    readableTimestampAgo(time: number, compareTime: number | undefined): string {
      const momentTime = moment.unix(time).local();
      return typeof compareTime !== "undefined"
        ? momentTime.from(moment.unix(compareTime).local())
        : momentTime.fromNow();
    },

    readableNumber(value: number, digits: number = 0, omitSeparator: boolean = false): string {
      if (omitSeparator) {
        return value.toFixed(digits);
      }

      return value.toLocaleString(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });
    },
  },
};
