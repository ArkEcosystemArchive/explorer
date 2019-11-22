import moment from "moment";
import store from "@/store";
import { ITransaction } from "@/interfaces";
import { BigNumber } from "@/utils";

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

    calculateMultipaymentAmount(transaction: ITransaction): BigNumber {
      if (transaction.asset && transaction.asset.payments) {
        return transaction.asset.payments.reduce(
          (sum: BigNumber, { amount }: { amount: string }) => sum.plus(amount),
          BigNumber.ZERO,
        );
      }
      return BigNumber.ZERO;
    },

    fetchWalletAmountFromMultipayment(transaction: ITransaction, address: string): BigNumber {
      if (transaction.asset && transaction.asset.payments) {
        return BigNumber.make(
          transaction.asset.payments.find(
            (wallet: { recipientId: string; amount: string }) => wallet.recipientId === address,
          ).amount,
        );
      }
      return BigNumber.ZERO;
    },
  },
};
