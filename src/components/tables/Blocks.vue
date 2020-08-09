<template>
  <Loader :data="blocks">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="blocks"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'id'">
          <LinkBlock :id="data.row.id" />
        </div>

        <div v-else-if="data.column.field === 'height'">
          <span>
            {{ readableNumber(data.row.height) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'timestamp.unix'">
          <span>
            {{ readableTimestamp(data.row.timestamp.unix) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'transactions'">
          <span>
            {{ data.row.transactions }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'generator.username'">
          <LinkWallet :key="data.row.generator.address" :address="data.row.generator.address" />
        </div>

        <div v-else-if="data.column.field === 'forged.total'">
          <span
            v-tooltip="{
              trigger: 'hover',
              content: readableCurrency(data.row.forged.total, data.row.price),
            }"
            class="whitespace-no-wrap"
          >
            {{ readableCrypto(data.row.forged.total) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'forged.fee'">
          <span
            v-tooltip="{
              trigger: 'hover',
              content: data.row.forged.fee ? readableCurrency(data.row.forged.fee, data.row.price) : '',
            }"
            class="whitespace-no-wrap"
          >
            {{ readableCrypto(data.row.forged.fee) }}
          </span>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IBlock, ISortParameters } from "@/interfaces";
import CryptoCompareService from "@/services/crypto-compare";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["isListed"]),
  },
})
export default class TableBlocksDesktop extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public blocks: IBlock[] | null;
  @Prop({ required: false, default: false }) public hideGeneratedBy: boolean;
  private isListed: boolean;

  get columns() {
    let columns = [
      {
        label: this.$t("COMMON.ID"),
        field: "id",
        thClass: "start-cell",
        tdClass: "start-cell",
      },
      {
        label: this.$t("COMMON.HEIGHT"),
        field: "height",
        type: "number",
        thClass: "text-left hidden md:table-cell",
        tdClass: "text-left hidden md:table-cell wrap-timestamp",
      },
      {
        label: this.$t("COMMON.TIMESTAMP"),
        field: "timestamp.unix",
        type: "number",
        thClass: "text-left hidden md:table-cell",
        tdClass: "text-left hidden md:table-cell wrap-timestamp",
      },
      {
        label: this.$t("COMMON.TRANSACTIONS"),
        field: "transactions",
        type: "number",
      },
      {
        label: this.$t("BLOCK.GENERATED_BY"),
        field: "generator.username",
        thClass: "text-right",
        tdClass: "text-right",
      },
      {
        label: this.$t("BLOCK.TOTAL_FORGED"),
        field: "forged.total",
        type: "number",
        thClass: "end-cell lg:base-cell",
        tdClass: "end-cell lg:base-cell",
      },
      {
        label: this.$t("BLOCK.FEES"),
        field: "forged.fee",
        type: "number",
        thClass: "end-cell hidden lg:table-cell",
        tdClass: "end-cell hidden lg:table-cell",
      },
    ];

    if (this.hideGeneratedBy) {
      columns = columns.filter((column) => column.field !== "generator.username");
    }

    return columns;
  }

  get currencySymbol() {
    return this.$store.getters["currency/symbol"];
  }

  @Watch("blocks")
  public async onBlocksChanged() {
    await this.prepareBlocks();
  }

  @Watch("currencySymbol")
  public async onCurrencySymbolChanged() {
    await this.updatePrices();
  }

  public created() {
    this.prepareBlocks();
  }

  private async prepareBlocks() {
    await this.updatePrices();
  }

  private async fetchPrice(block: IBlock) {
    block.price = await CryptoCompareService.dailyAverage(block.timestamp.unix);
  }

  private async updatePrices() {
    if (!this.blocks) {
      return;
    }

    if (this.isListed) {
      const promises = this.blocks.map(this.fetchPrice);
      await Promise.all(promises);
    }
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>

<style>
.wrap-timestamp {
  white-space: normal;
}

@media (min-width: 870px) {
  .wrap-timestamp {
    white-space: nowrap;
  }
}
</style>
