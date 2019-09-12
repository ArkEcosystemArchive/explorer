<template>
  <div v-if="transaction" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.TRANSACTION") }}</ContentHeader>

    <template v-if="transactionNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <NotFound :is-loading="isLoading" :data-id="transaction.id" data-type="transaction" @reload="onReload" />
        </div>
      </section>
    </template>

    <template v-else>
      <section class="mb-5">
        <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center">
          <div class="mr-6 flex-none">
            <img class="block" src="@/assets/images/icons/transaction.svg" />
          </div>
          <div class="flex-auto min-w-0">
            <div class="text-grey mb-2">
              {{ $t("TRANSACTION.ID") }}
            </div>
            <div class="flex">
              <div class="text-xl text-white semibold truncate">
                <span class="mr-2">{{ transaction.id }}</span>
              </div>
              <Clipboard v-if="transaction.id" :value="transaction.id" />
            </div>
          </div>
        </div>
      </section>

      <TransactionDetails :transaction="transaction" />

      <!-- TODO: Multipayment transactions table -->
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
import TransactionService from "@/services/transaction";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    NotFound,
    TransactionDetails,
  },
  computed: {
    ...mapGetters("network", ["height"]),
  },
})
export default class TransactionPage extends Vue {
  private transaction: ITransaction | null = null;
  private transactionNotFound: boolean = false;
  private isLoading: boolean = false;
  private height: number;

  public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    try {
      const transaction = await TransactionService.find(to.params.id);
      next((vm: TransactionPage) => {
        vm.setTransaction(transaction);
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

  private onReload() {
    this.fetchTransaction();
  }
}
</script>
