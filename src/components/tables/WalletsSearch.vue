<template>
  <Loader :data="wallets">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="wallets"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'address'">
          <LinkWallet :key="data.row.address" :address="data.row.address" :trunc="false" />
        </div>

        <div v-else-if="data.column.field === 'vote'">
          <LinkWallet
            v-if="data.row.vote"
            :key="votedDelegate(data.row.vote).address"
            :address="votedDelegate(data.row.vote).address"
          >
            <span class="truncate">{{ votedDelegate(data.row.vote).username }}</span>
          </LinkWallet>
        </div>

        <div v-else-if="data.column.field === 'balance'">
          <span>{{ readableCrypto(data.row.balance, true, truncateBalance ? 2 : 8) }}</span>
        </div>

        <div v-else-if="data.column.field === 'supply'">{{ supplyPercentage(data.row.balance) }}</div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISortParameters, IWallet } from "@/interfaces";
import { mapGetters } from "vuex";
import { BigNumber } from "@/utils";

@Component
export default class TableWalletsSearchDesktop extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public wallets: IWallet[] | null;
  @Prop({ required: true }) public total: string;

  private windowWidth = 0;

  get truncateBalance() {
    return this.windowWidth < 700;
  }

  get columns() {
    const columns = [
      {
        label: this.$t("WALLET.ADDRESS"),
        field: "address",
        thClass: "start-cell",
        tdClass: "start-cell",
      },
      {
        label: this.$t("WALLET.VOTING_FOR"),
        field: "vote",
      },
      {
        label: this.$t("COMMON.BALANCE"),
        field: "balance",
        type: "number",
        tdClass: "whitespace-no-wrap",
      },
      {
        label: this.$t("COMMON.SUPPLY"),
        field: "supply",
        type: "number",
        sortable: false,
        thClass: "end-cell not-sortable",
        tdClass: "end-cell",
      },
    ];

    return columns;
  }

  public mounted() {
    this.windowWidth = window.innerWidth;

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }

  public supplyPercentage(balance: string): string {
    // @ts-ignore
    return this.percentageString(BigNumber.make(balance).dividedBy(this.total).times(100).toNumber());
  }

  private votedDelegate(vote) {
    return this.$store.getters["delegates/byPublicKey"](vote) || {};
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>
