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
        <div v-if="data.column.field === 'lockId'">
          <LinkTransaction
            :id="data.row.lockId"
            :smart-bridge="data.row.vendorField"
            :show-smart-bridge-icon="showSmartBridgeIcon"
          />
        </div>

        <div v-else-if="data.column.field === 'expirationValue'">
          <span v-if="data.row.expirationType === 1">
            {{ readableTimestampFromEpoch(data.row.expirationValue) }}
          </span>
          <span v-if="data.row.expirationType === 2">
            <div
              v-tooltip="{
                trigger: 'hover click',
                content: readableTimestampFromBlockheight(data.row.expirationValue),
                placement: 'top',
              }"
            >
              {{ data.row.expirationValue }}
            </div>
          </span>
        </div>

        <div v-else-if="data.column.field === 'recipientId'">
          <LinkWallet
            :key="data.row.recipientId"
            :address="data.row.recipientId"
            :type="data.row.type"
            :asset="data.row.asset"
            :type-group="data.row.typeGroup"
          />
        </div>

        <div v-else-if="data.column.field === 'vendorField'">
          <div class="cell-smartbridge-truncate">
            {{ data.row.vendorField }}
          </div>
        </div>

        <div v-else-if="data.column.field === 'amount'">
          <TransactionAmount :transaction="data.row" />
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
    ...mapGetters("network", ["activeDelegates", "isListed"]),
    ...mapGetters("currency", { currencySymbol: "symbol" }),
    ...mapGetters("ui", ["smartbridgeFilter"]),
  },
})
export default class LockTransactionsDesktop extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public transactions: ITransaction[] | null;

  private activeDelegates: IDelegate[];
  private isListed: boolean;
  private currencySymbol: string;
  private smartbridgeFilter: string;

  get columns() {
    const columns = [
      {
        label: this.$t("COMMON.ID"),
        field: "lockId",
        thClass: "start-cell",
        tdClass: "start-cell",
      },
      {
        label: this.$t("COMMON.EXPIRATION"),
        field: "expirationValue",
        type: "number",
        thClass: "text-left hidden md:table-cell",
        tdClass: "text-left hidden md:table-cell wrap-timestamp",
      },
      {
        label: this.$t("TRANSACTION.RECIPIENT"),
        field: "recipientId",
        tdClass: "break-all",
      },
      {
        label: this.$t("TRANSACTION.SMARTBRIDGE"),
        field: "vendorField",
        thClass: "text-right cell-smartbridge",
        tdClass: "text-right cell-smartbridge",
        hidden: this.smartbridgeFilter === "hidden",
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

  get showSmartBridgeIcon() {
    if (this.smartbridgeFilter === "hidden") {
      return false;
    }

    return this.transactions!.some((transaction) => {
      return !!transaction.vendorField;
    });
  }

  @Watch("transactions")
  public async onTransactionsChanged() {
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
    await this.updatePrices();
  }

  private async fetchPrice(transaction: ITransaction) {
    transaction.price = await CryptoCompareService.dailyAverage(transaction.timestamp.unix);
  }

  private async updatePrices() {
    if (!this.transactions) {
      return;
    }

    if (this.isListed) {
      const promises = this.transactions.map(this.fetchPrice);
      await Promise.all(promises);
    }
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
}

.wrap-timestamp {
  white-space: normal;
}

@media (min-width: 870px) {
  .wrap-timestamp {
    white-space: nowrap;
  }
}
</style>
