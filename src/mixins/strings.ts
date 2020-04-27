import store from "@/store";
import { Sanitizer } from "@/utils/Sanitizer";

const locale = store.getters["ui/locale"];

export default {
  methods: {
    truncate(value: string, length = 13, truncateWhere = "middle"): string {
      switch (truncateWhere) {
        case "left":
          return value.length > length ? `...${value.slice(value.length - length + 3)}` : value;

        case "middle":
          const odd = length % 2;
          const truncationLength = Math.floor((length - 1) / 2);
          return value.length > length
            ? `${value.slice(0, truncationLength - odd)}...${value.slice(value.length - truncationLength + 1)}`
            : value;

        case "right":
          return value.length > length ? `${value.slice(0, length - 3)}...` : value;

        default:
          return value;
      }
    },

    capitalize(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    percentageString(value: number, decimals = 2): string {
      if (typeof value !== "undefined") {
        return (value / 100).toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          style: "percent",
        });
      }

      return "-";
    },
  },
};
