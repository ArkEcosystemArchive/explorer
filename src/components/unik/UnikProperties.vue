<template>
  <Loader :data="properties">
    <TableWrapper
       v-bind="$attrs"
      :columns="columns"
      :rows="properties"
      >
      <template slot-scope="data">
        <div v-if="data.column.field === 'key'">
          {{ data.row.key }}
        </div>
        <div v-else-if="data.column.field === 'value'">
          {{ data.row.value }}
        </div>
      </template>
    </TableWrapper>
  </Loader>
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
        thClass: "text-right w-64",
        tdClass: "text-right w-64",
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
