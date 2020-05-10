import moment from "moment";
import store from "@/store";
import { ITransaction } from "@/interfaces";
import { BigNumber } from "@/utils";

const locale = store.getters["ui/locale"];

export default {
  methods: {
    readableTimestamp(value: number): string {
      return moment.unix(value).local().format("L LTS");
    },

    readableTimestampAgo(time: number, compareTime: number | undefined): string {
      const momentTime = moment.unix(time).local();
      return typeof compareTime !== "undefined"
        ? momentTime.from(moment.unix(compareTime).local())
        : momentTime.fromNow();
    },

    readableNumber(value: number, digits = 0, omitSeparator = false): string {
      if (omitSeparator) {
        return value.toFixed(digits);
      }

      return value.toLocaleString(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });
    },

    readableTimestampFromBlockheight(height: number): string {
      const blocktime = store.getters["network/blocktime"];
      const currentHeight = store.getters["network/height"];
      return moment()
        .add((height - currentHeight) * blocktime, "seconds")
        .local()
        .format("L LTS");
    },

    readableTimestampFromOffset(unixOffset: number, time: number): string {
      return moment
        .unix(unixOffset + time)
        .local()
        .format("L LTS");
    },

    readableTimestampFromEpoch(time: number): string {
      const epoch = store.getters["network/epoch"] || "";
      const epochUnix = moment(epoch).unix();
      return moment
        .unix(epochUnix + time)
        .local()
        .format("L LTS");
    },

    calculateMultipaymentAmount(transaction: ITransaction, address?: string, type = "all"): BigNumber {
      if (transaction.asset && transaction.asset.payments) {
        return transaction.asset.payments.reduce(
          (sum: BigNumber, { recipientId, amount }: { recipientId: string; amount: string }) => {
            if (!address) {
              return sum.plus(amount);
            }

            switch (type) {
              case "all":
                if (transaction.sender === address) {
                  return recipientId !== address ? sum.plus(amount) : sum;
                }

              case "received":
                return recipientId === address ? sum.plus(amount) : sum;

              case "sent":
                return sum.plus(amount);
            }
          },
          BigNumber.ZERO,
        );
      }
      return BigNumber.ZERO;
    },
  },
};
