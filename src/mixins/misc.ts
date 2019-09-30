import moment from "moment";
import store from "@/store";
import { ITransaction } from "@/interfaces";

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

    readableNumber(value: number, digits: number = 2, omitSeparator: boolean = false): string {
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

    calculateMultipaymentAmount(transaction: ITransaction): number {
      if (transaction.asset && transaction.asset.payments) {
        return transaction.asset.payments.reduce(
          (sum: number, { amount }: { amount: string }) => sum + Number(amount),
          0,
        );
      }
      return 0;
    },

    fetchWalletAmountFromMultipayment(transaction: ITransaction, address: string): number {
      if (transaction.asset && transaction.asset.payments) {
        return Number(
          transaction.asset.payments.find(
            (wallet: { recipientId: string; amount: string }) => wallet.recipientId === address,
          ).amount,
        );
      }
      return 0;
    },
  },
};
