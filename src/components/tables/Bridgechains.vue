<template>
  <Loader :data="bridgechains">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="bridgechains"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'name'">
          <span>{{ data.row.name }}</span>
          <span v-if="data.row.isResigned" class="ml-2 rounded text-sm text-white bg-theme-resigned-label p-1">{{
            $t("PAGES.BRIDGECHAINS.RESIGNED")
          }}</span>
        </div>

        <div v-else-if="data.column.field === 'publicKey'">
          <LinkWallet :address="data.row.publicKey" />
        </div>

        <div v-else-if="data.column.field === 'seedNodes'">
          <span>
            {{ data.row.seedNodes[0] }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'bridgechainRepository'">
          <a :href="data.row.bridgechainRepository" target="_blank" rel="noopener noreferrer nofollow">{{
            data.row.bridgechainRepository
          }}</a>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IBridgechain, ISortParameters } from "@/interfaces";

@Component
export default class TableBridgechainsDesktop extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public bridgechains: IBridgechain[] | null;

  get columns() {
    const columns = [
      {
        label: this.$t("PAGES.BRIDGECHAINS.NAME"),
        field: "name",
        thClass: "start-cell",
        tdClass: "start-cell",
      },
      {
        label: this.$t("PAGES.BRIDGECHAINS.CREATOR"),
        field: "publicKey",
        thClass: "text-left hidden md:table-cell",
        tdClass: "text-left hidden md:table-cell",
      },
      {
        label: this.$t("PAGES.BRIDGECHAINS.SEED_SERVER"),
        field: "seedNodes",
      },
      {
        label: this.$t("PAGES.BRIDGECHAINS.REPOSITORY"),
        field: "bridgechainRepository",
        thClass: "end-cell hidden lg:table-cell",
        tdClass: "end-cell hidden lg:table-cell",
      },
    ];

    return columns;
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>

<style></style>
