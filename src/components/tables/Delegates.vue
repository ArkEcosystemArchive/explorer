<template>
  <Loader :data="delegates">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="delegates"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'rank'">
          <span>
            {{ data.row.rank }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'username'" class="flex items-center">
          <LinkWallet :address="data.row.address">
            {{ data.row.username }}
          </LinkWallet>
          <span v-if="data.row.isResigned" class="ml-2 rounded text-sm text-white bg-theme-resigned-label p-1">{{
            $t("WALLET.DELEGATE.STATUS.RESIGNED")
          }}</span>
        </div>

        <div v-else-if="data.column.field === 'blocks.produced'">
          {{ readableNumber(data.row.blocks.produced) }}
        </div>

        <div v-else-if="data.column.field === 'forged.total'">
          {{ readableCrypto(data.row.forged.total) }}
        </div>

        <div v-else-if="data.column.field === 'votes'">
          <span v-tooltip="$t('COMMON.SUPPLY_PERCENTAGE')" class="text-grey text-2xs mr-1">
            {{ percentageString(data.row.production.approval) }}
          </span>
          {{ readableCrypto(data.row.votes, true, 2) }}
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IDelegate, ISortParameters } from "@/interfaces";

@Component
export default class TableDelegatesDesktop extends Vue {
  @Prop({
    required: true,
    validator: value => {
      return Array.isArray(value) || value === null;
    },
  })
  public delegates: IDelegate[] | null;
  @Prop({ required: false, default: false }) public hideRanks: boolean;

  get columns() {
    const columns = [
      {
        label: this.$t("WALLET.DELEGATE.USERNAME"),
        field: "username",
        thClass: this.usernameClass,
        tdClass: this.usernameClass,
      },
      {
        label: this.$t("PAGES.DELEGATE_MONITOR.FORGED_BLOCKS"),
        type: "number",
        field: "blocks.produced",
      },
      {
        label: this.$t("WALLET.DELEGATE.TOTAL_FORGED"),
        type: "number",
        field: "forged.total",
      },
      {
        label: this.$t("PAGES.DELEGATE_MONITOR.VOTES"),
        field: "votes",
        type: "number",
        thClass: "end-cell hidden lg:table-cell",
        tdClass: "end-cell hidden lg:table-cell",
      },
    ];
    if (!this.hideRanks) {
      columns.unshift(
        {
          label: this.$t("COMMON.RANK"),
          field: "rank",
          type: "number",
          thClass: "start-cell w-32",
          tdClass: "start-cell w-32",
        }
      )
    }

    return columns;
  }

  get usernameClass(): string {
    return this.hideRanks ? "start-cell text-left" : "text-left";
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>

<style>

</style>
