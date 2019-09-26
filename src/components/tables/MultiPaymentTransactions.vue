<template>
  <Loader :data="transactions">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="transactions"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'recipientId'">
          <LinkWallet :address="data.row.recipientId" :type="0" :trunc="false" />
        </div>

        <div v-else-if="data.column.field === 'amount'">
          {{ readableCrypto(data.row.amount) }}
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate, ISortParameters, ITransaction } from "@/interfaces";
import CryptoCompareService from "@/services/crypto-compare";

@Component({
  computed: {
    ...mapGetters("currency", { currencySymbol: "symbol" }),
  },
})
export default class MultiPaymentTransactions extends Vue {
  @Prop({ required: true }) public transaction: ITransaction;

  private currencySymbol: string;
  private transactions: Array<{ recipientId: string; amount: string }> | null = null;

  get columns() {
    const columns = [
      {
        label: this.$t("TRANSACTION.RECIPIENTS"),
        field: "recipientId",
        thClass: "start-cell",
        tdClass: "start-cell break-all",
      },
      {
        label: this.$t("TRANSACTION.AMOUNT"),
        field: "amount",
        type: "number",
        thClass: "end-cell",
        tdClass: "end-cell",
      },
    ];

    return columns;
  }

  @Watch("transaction")
  public async onTransactionChanged() {
    await this.prepareTransactions();
  }

  @Watch("currencySymbol")
  public async onCurrencySymbolChanged() {
    await this.updatePrices();
  }

  public async created() {
    this.prepareTransactions();
  }

  private async prepareTransactions() {
    this.transactions = this.transaction.asset.payments;
    await this.updatePrices();
  }

  private async fetchPrice(transaction: ITransaction) {
    transaction.price = await CryptoCompareService.dailyAverage(this.transaction.timestamp.unix);
  }

  private async updatePrices() {
    if (!this.transaction) {
      return;
    }

    const promises = this.transaction.asset.payments.map(this.fetchPrice);
    await Promise.all(promises);
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>
