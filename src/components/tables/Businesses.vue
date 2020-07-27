<template>
  <Loader :data="businesses">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="businesses"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'name'">
          <span>{{ data.row.name }}</span>
          <span v-if="data.row.isResigned" class="p-1 ml-2 text-sm text-white rounded bg-theme-resigned-label">{{
            $t("PAGES.BUSINESSES.RESIGNED")
          }}</span>
        </div>

        <div v-else-if="data.column.field === 'address'">
          <LinkWallet :address="data.row.address" />
        </div>

        <div v-else-if="data.column.field === 'website'">
          <a :href="data.row.website" target="_blank" rel="noopener noreferrer nofollow">{{ data.row.website }}</a>
        </div>

        <div v-else-if="data.column.field === 'repository'">
          <a :href="data.row.repository" target="_blank" rel="noopener noreferrer nofollow">{{
            data.row.repository
          }}</a>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IBusiness, ISortParameters } from "@/interfaces";

@Component
export default class TableBusinessesDesktop extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public businesses: IBusiness[] | null;

  get columns() {
    const columns = [
      {
        label: this.$t("PAGES.BUSINESSES.NAME"),
        field: "name",
        thClass: "start-cell",
        tdClass: "start-cell",
      },
      {
        label: this.$t("PAGES.BUSINESSES.CREATOR"),
        field: "address",
        thClass: "text-left hidden md:table-cell",
        tdClass: "text-left hidden md:table-cell",
      },
      {
        label: this.$t("PAGES.BUSINESSES.WEBSITE"),
        field: "website",
      },
      {
        label: this.$t("PAGES.BUSINESSES.REPOSITORY"),
        field: "repository",
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
