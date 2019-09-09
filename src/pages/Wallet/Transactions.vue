<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.TRANSACTIONS") }}</ContentHeader>

    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="mr-6 flex-none">
          <img class="block" src="@/assets/images/icons/transaction.svg" />
        </div>
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">
            {{ $t("WALLET.ADDRESS") }}
          </div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ address }}</span>
            </div>
            <Clipboard v-if="address" :value="address" />
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <div class="text-grey mb-2">
            {{ $t("COMMON.TYPE") }}
          </div>
          <div class="relative text-white z-20">
            <span
              v-click-outside="closeDropdown"
              class="cursor-pointer flex items-center"
              @click="selectOpen = !selectOpen"
            >
              <span class="mr-1">{{ $t(`TRANSACTION.TYPES.${type.toUpperCase()}`) }}</span>
              <svg
                :class="{ 'rotate-180': selectOpen }"
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="16px"
                height="16px"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <ul
              v-show="selectOpen"
              class="absolute right-0 mt-px bg-theme-content-background shadow-theme rounded border overflow-hidden text-sm"
            >
              <li v-for="txType in ['all', 'sent', 'received']" :key="txType">
                <RouterLink
                  :to="{ name: 'wallet-transactions', params: { address: address, type: txType, page: 1 } }"
                  class="dropdown-button"
                >
                  {{ $t(`TRANSACTION.TYPES.${txType.toUpperCase()}`) }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableTransactionsDesktop
          :transactions="transactions"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableTransactionsMobile :transactions="transactions" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { IBlock, IDelegate, ISortParameters, ITransaction, IWallet } from "@/interfaces";
// @ts-ignore
import TransactionService from "@/services/transaction";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component
export default class WalletTransactions extends Vue {
  private transactions: ITransaction[] | null = null;
  private meta: any | null = null;
  private currentPage: number = 0;
  private selectOpen: boolean = false;

  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get address() {
    return this.$route.params.address;
  }

  get type() {
    return this.$route.params.type;
  }

  get sortParams() {
    return this.$store.getters["ui/transactionSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setTransactionSortParams", {
      field: params.field,
      type: params.type,
    });
  }

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteEnter(to: Route, from: Route, next: () => void) {
    try {
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](to.params.address, to.params.page);

      // @ts-ignore
      next(vm => {
        vm.currentPage = Number(to.params.page);
        vm.setTransactions(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      // @ts-ignore
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    this.selectOpen = false;
    this.transactions = null;
    this.meta = null;

    try {
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](to.params.address, to.params.page);

      this.currentPage = Number(to.params.page);
      this.setTransactions(data);
      this.setMeta(meta);
      next();
    } catch (e) {
      // @ts-ignore
      next({ name: "404" });
    }
  }

  private setTransactions(transactions: ITransaction[]) {
    if (!transactions) {
      return;
    }

    this.transactions = transactions.map(transaction => ({ ...transaction, price: null }));
  }

  private setMeta(meta: any) {
    this.meta = meta;
  }

  private onPageChange(page: number) {
    this.currentPage = page;
  }

  private closeDropdown() {
    this.selectOpen = false;
  }

  private changePage() {
    // @ts-ignore
    this.$router.push({
      name: "wallet-transactions",
      params: {
        address: this.address,
        type: this.type,
        page: this.currentPage,
      },
    });
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
