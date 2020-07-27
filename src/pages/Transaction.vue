<template>
  <div v-if="transaction" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.TRANSACTION") }}</ContentHeader>

    <template v-if="transactionNotFound">
      <section class="px-6 py-5 page-section md:py-10">
        <div class="my-10 text-center">
          <NotFound :is-loading="isLoading" :data-id="transaction.id" data-type="transaction" @reload="onReload" />
        </div>
      </section>
    </template>

    <template v-else>
      <section class="mb-5">
        <div class="flex items-center justify-between px-5 py-8 sm:px-10 bg-theme-feature-background xl:rounded-lg">
          <div class="relative flex-none mr-6">
            <SvgIcon class="block" name="transaction" view-box="0 0 43 39" />
            <div
              class="absolute text-2xl text-theme-transaction-icon"
              style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
            >
              {{ networkSymbol }}
            </div>
          </div>
          <div class="flex-auto min-w-0">
            <div class="mb-2 text-grey">
              {{ $t("TRANSACTION.ID") }}
            </div>
            <div class="flex">
              <div class="text-xl text-white truncate semibold">
                <span class="mr-2">{{ transaction.id }}</span>
              </div>
              <Clipboard v-if="transaction.id" :value="transaction.id" />
            </div>
          </div>
        </div>
      </section>

      <TransactionDetails ref="transactionDetails" :transaction="transaction" />

      <section v-if="isMultiPayment(transaction.type, transaction.typeGroup)" class="py-5 page-section md:py-10">
        <MultiPaymentTransactions :transaction="transaction" :page="currentPage" />
        <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
      </section>
    </template>
  </div>
</template>

<script lang="ts">
/* tslint:disable:no-console */
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { ISortParameters, ITransaction } from "@/interfaces";
import NotFound from "@/components/utils/NotFound.vue";
import TransactionDetails from "@/components/transaction/Details.vue";
import MultiPaymentTransactions from "@/components/tables/MultiPaymentTransactions.vue";
import TransactionService from "@/services/transaction";
import { paginationLimit } from "@/constants";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    NotFound,
    TransactionDetails,
  },
  computed: {
    ...mapGetters("network", ["height"]),
    ...mapGetters("network", { networkSymbol: "symbol" }),
    ...mapGetters("ui", ["smartbridgeFilter"]),
  },
})
export default class TransactionPage extends Vue {
  private transaction: ITransaction | null = null;
  private transactionNotFound = false;
  private isLoading = false;
  private meta: any | null = null;
  private currentPage = 1;
  private height: number;
  private networkSymbol: string;
  private smartbridgeFilter: string;

  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  @Watch("smartbridgeFilter")
  public onSmartbridgeFilterChanged() {
    if (this.smartbridgeFilter !== "hidden") {
      this.fetchTransaction();
    }
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    try {
      const transaction = await TransactionService.find(to.params.id);
      next((vm: TransactionPage) => {
        vm.setTransaction(transaction);
        vm.calculateMeta();
      });
    } catch (e) {
      next((vm: TransactionPage) => {
        console.log(e.message || e.data.error);

        vm.transactionNotFound = true;
        // @ts-ignore
        vm.transaction = { id: to.params.id };
      });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    this.transaction = null;

    try {
      const transaction = await TransactionService.find(to.params.id);
      this.setTransaction(transaction);
      this.calculateMeta();
      next();
    } catch (e) {
      console.log(e.message || e.data.error);

      this.transactionNotFound = true;
      // @ts-ignore
      this.transaction = { id: to.params.id };
    }
  }

  private async fetchTransaction() {
    this.isLoading = true;

    try {
      const transaction = await TransactionService.find(this.transaction!.id);
      this.setTransaction(transaction);
      this.transactionNotFound = false;
    } catch (e) {
      console.log(e.message || e.data.error);
    } finally {
      setTimeout(() => (this.isLoading = false), 750);
    }
  }

  private setTransaction(transaction: ITransaction) {
    this.transaction = transaction;
  }

  private onPageChange(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.meta.count = page;
      this.meta.self = page.toString();
      this.meta.next = page < this.meta.pageCount ? (page + 1).toString() : null;
      this.meta.previous = page > 1 ? (page - 1).toString() : null;

      // @ts-ignore
      this.$refs.transactionDetails.$el.scrollIntoView(false);
    }
  }

  private calculateMeta() {
    // @ts-ignore
    if (this.transaction && this.isMultiPayment(this.transaction.type, this.transaction.typeGroup)) {
      const transactions = this.transaction.asset.payments.length;
      const pages = Math.ceil(transactions / paginationLimit);
      this.meta = {
        count: transactions >= paginationLimit ? paginationLimit : transactions,
        pageCount: pages,
        totalCount: transactions,
        next: pages > 1 ? "2" : null,
        previous: null,
        self: "1",
        first: "1",
        last: pages.toString(),
      };
    }
  }

  private onReload() {
    this.fetchTransaction();
  }
}
</script>
