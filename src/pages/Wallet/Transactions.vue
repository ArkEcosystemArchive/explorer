<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.TRANSACTIONS") }}</ContentHeader>

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
            {{ $t("WALLET.ADDRESS") }}
          </div>
          <div class="flex">
            <div class="text-lg text-white truncate semibold">
              <span class="mr-2">{{ address }}</span>
            </div>
            <Clipboard v-if="address" :value="address" />
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <div class="mb-2 text-grey">
            {{ $t("COMMON.TYPE") }}
          </div>
          <div class="relative z-20 text-white">
            <span
              v-click-outside="closeDropdown"
              class="flex items-center cursor-pointer"
              @click="selectOpen = !selectOpen"
            >
              <span class="mr-1">{{ $t(`TRANSACTION.TYPES.${type.toUpperCase()}`) }}</span>
              <SvgIcon :class="{ 'rotate-180': selectOpen }" name="caret" view-box="0 0 16 16" />
            </span>
            <ul
              v-show="selectOpen"
              class="absolute right-0 mt-px overflow-hidden text-sm border rounded bg-theme-content-background shadow-theme"
            >
              <li v-for="type in availableTransactionTypes" :key="type">
                <RouterLink
                  :to="{
                    name: 'wallet-transactions',
                    params: { address: address, type, page: 1 },
                  }"
                  class="dropdown-button"
                >
                  {{ $t(`TRANSACTION.TYPES.${type.toUpperCase()}`) }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 page-section md:py-10">
      <div class="hidden sm:block">
        <TableTransactionsDesktop
          v-if="!isLocks"
          :transactions="transactions"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
        <TableLockTransactionsDesktop
          v-else
          :transactions="transactions"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableTransactionsMobile v-if="!isLocks" :transactions="transactions" />
        <TableLockTransactionsMobile v-else :transactions="transactions" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { IBlock, IDelegate, ISortParameters, ITransaction, IWallet } from "@/interfaces";
import TransactionService from "@/services/transaction";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  computed: {
    ...mapGetters("network", { networkSymbol: "symbol" }),
    ...mapGetters("network", ["hasHtlcEnabled"]),

    availableTransactionTypes() {
      const types = ["all", "sent", "received"];

      if (this.hasHtlcEnabled) {
        types.push("locks");
      }

      return types;
    },
  },
})
export default class WalletTransactions extends Vue {
  private transactions: ITransaction[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;
  private selectOpen = false;
  private networkSymbol: string;

  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get address() {
    return this.$route.params.address;
  }

  get type() {
    return this.$store.getters["ui/walletTransactionTab"];
  }

  set type(type: string) {
    this.$store.dispatch("ui/setWalletTransactionTab", type);
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

  get isLocks() {
    return this.$route.params.type === "locks";
  }

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    try {
      // @ts-ignore
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](
        to.params.address,
        Number(to.params.page),
      );

      next((vm: WalletTransactions) => {
        vm.type = to.params.type;
        vm.currentPage = Number(to.params.page);
        vm.setTransactions(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.selectOpen = false;
    this.transactions = null;
    this.meta = null;

    try {
      // @ts-ignore
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](
        to.params.address,
        Number(to.params.page),
      );

      this.type = to.params.type;
      this.currentPage = Number(to.params.page);
      this.setTransactions(data);
      this.setMeta(meta);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  private setTransactions(transactions: ITransaction[]) {
    if (!transactions) {
      return;
    }

    this.transactions = transactions.map((transaction) => ({
      ...transaction,
      price: null,
    }));
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
    if (this.currentPage !== Number(this.$route.params.page) || this.address !== this.$route.params.address) {
      // @ts-ignore
      this.$router.push({
        name: "wallet-transactions",
        params: {
          address: this.address,
          type: this.type,
          page: this.currentPage.toString(),
        },
      });
    }
  }

  // TODO: handle difference in locks vs all / received / sent pages
  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
