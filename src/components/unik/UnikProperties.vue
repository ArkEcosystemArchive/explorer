<template>
  <TableWrapper v-if="properties"
    v-bind="$attrs"
    :columns="columns"
    :rows="properties"
    :no-data-message="$t('UNIK.NO_PROPERTIES')"
    >
    <template slot-scope="data">
      <div>
        {{ data.row.key }}
      </div>
      <div>
        {{ data.row.value }}
      </div>
    </template>
  </TableWrapper>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class UnikProperties extends Vue {
  @Prop({ required: true, default: [] }) public properties: Array<{ key: any; value: any }>;

  get columns() {
    let columns = [
      {
        label: this.$t("UNIK.KEY"),
        field: "key",
        thClass: "text-right",
        tdClass: "text-right",
      },
      {
        label: this.$t("UNIK.VALUE"),
        field: "value",
        thClass: "text-left",
        tdClass: "text-left",
      }
    ];
    return columns;
  }
}
</script>
