import { Component, Prop, Vue } from "vue-property-decorator";
import { VueGoodTable } from "vue-good-table";
import { CreateElement, VNode } from "vue";
import i18n from "@/i18n";

@Component
export default class TableWrapper extends Vue {
  @Prop({ required: false, default: 1 }) public currentPage: number;
  @Prop({ required: false, default: false }) public hasPagination: boolean;
  @Prop({ required: false, default: 10 }) public perPage: number;
  @Prop({ required: false, default: () => [10, 20, 30, 40, 50] }) public perPageDropdown: number[];
  @Prop({ required: false, default: false }) public isRemote: boolean;
  @Prop({ required: false, default: () => ({}) }) public sortQuery: object;
  @Prop({ required: false, default: i18n.t("COMMON.NO_RESULTS") }) public noDataMessage: string;

  public render(createElement: CreateElement): VNode {
    return createElement(
      VueGoodTable,
      {
        props: {
          mode: this.isRemote ? "remote" : "local",
          sortOptions: {
            enabled: !!this.sortQuery,
            initialSortBy: this.sortQuery,
          },
          paginationOptions: {
            enabled: this.hasPagination,
            dropdownAllowAll: false,
            perPage: this.perPage,
            perPageDropdown: this.perPageDropdown,
            nextLabel: this.$t("PAGINATION.NEXT"),
            prevLabel: this.$t("PAGINATION.PREVIOUS"),
            rowsPerPageLabel: this.$t("PAGINATION.ROWS_PER_PAGE"),
            ofLabel: this.$t("PAGINATION.OF"),
            pageLabel: this.$t("PAGINATION.PAGE"),
            allLabel: this.$t("PAGINATION.ALL"),
          },
          ...this.$attrs,
        },
        scopedSlots: {
          "table-row": (table) =>
            this.$scopedSlots.default!({
              ...table,
            }),
        },
        on: this.$listeners,
      },
      [
        createElement(
          "div",
          {
            slot: "emptystate",
            class: "flex justify-center font-semibold",
          },
          [
            createElement(
              "span",
              {
                class: "text-theme-page-text-light",
              },
              this.noDataMessage,
            ),
          ],
        ),
      ],
    );
  }
}
