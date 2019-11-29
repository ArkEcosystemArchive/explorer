<template>
  <div class="WalletTransactions">
    <h2 class="text-2xl mb-5 md:mb-6 px-5 sm:hidden text-white">
      {{ $t("COMMON.TRANSACTIONS") }}
    </h2>
    <section class="page-section py-5 md:py-10">
      <nav class="TransactionsNavigation mx-5 md:mx-10">
        <div
          :class="{ active: !isTypeSent && !isTypeReceived && !isTypeLocks }"
          class="TransactionsNavigation--tab"
          @click="setType('all')"
        >
          {{ $t("TRANSACTION.TYPES.ALL") }}
        </div>
        <div
          :class="{
            active: isTypeSent,
            disabled: !sentCount,
          }"
          class="TransactionsNavigation--tab"
          @click="setType('sent')"
        >
          {{ $t("TRANSACTION.TYPES.SENT") }}
          <span>{{ sentCount }}</span>
        </div>
        <div
          :class="{
            active: isTypeReceived,
            disabled: !receivedCount,
          }"
          class="TransactionsNavigation--tab"
          @click="setType('received')"
        >
          {{ $t("TRANSACTION.TYPES.RECEIVED") }}
          <span>{{ receivedCount }}</span>
        </div>
        <div
          :class="{
            active: isTypeLocks,
            disabled: !locksCount,
          }"
          class="TransactionsNavigation--tab"
          @click="setType('locks')"
        >
          {{ $t("TRANSACTION.TYPES.LOCKS") }}
          <span>{{ locksCount }}</span>
        </div>
      </nav>

      <template v-if="isTypeLocks">
        <div class="hidden sm:block">
          <TableLockTransactionsDesktop :transactions="transactions" />
        </div>
        <div class="sm:hidden">
          <TableLockTransactionsMobile :transactions="transactions" />
        </div>
      </template>
      <template v-else>
        <div class="hidden sm:block">
          <TableTransactionsDesktop :show-confirmations="true" :transactions="transactions" />
        </div>
        <div class="sm:hidden">
          <TableTransactionsMobile :show-confirmations="true" :transactions="transactions" />
        </div>
      </template>

      <div v-if="transactions && transactions.length >= 25" class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
        <RouterLink
          :to="{ name: 'wallet-transactions', params: { address: wallet.address, type, page: 2 } }"
          tag="button"
          class="button-lg"
        >
          {{ $t("PAGINATION.SHOW_MORE") }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ISortParameters, ITransaction, IWallet } from "@/interfaces";
import TransactionService from "@/services/transaction";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";

@Component
export default class WalletTransactions extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private transactions: ITransaction[] | null = null;
  private receivedCount: number = 0;
  private sentCount: number = 0;
  private locksCount: number = 0;

  get isTypeSent() {
    return this.type === "sent";
  }

  get isTypeReceived() {
    return this.type === "received";
  }

  get isTypeLocks() {
    return this.type === "locks";
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

  @Watch("wallet")
  public onWalletChanged() {
    this.getTransactions();

    this.getSentCount();
    this.getReceivedCount();
    this.getLocksCount();
  }

  public mounted() {
    this.getTransactions();

    this.getSentCount();
    this.getReceivedCount();
    this.getLocksCount();
  }

  private async getTransactions() {
    this.transactions = null;

    if (this.wallet.address !== undefined) {
      // @ts-ignore
      const { data } = await TransactionService[`${this.type}ByAddress`](this.wallet.address, 1);

      // Only need to check for sent / received transactions
      if (!this.isTypeLocks) {
        // TODO: move to separate function
        const lockIds: string[] = [];
        let transactions = data.map((transaction: ITransaction) => {
          // @ts-ignore
          if (this.isTimelock(transaction.type, transaction.typeGroup)) {
            lockIds.push(transaction.id);
          }
          return { ...transaction, price: null };
        });
        if (lockIds.length > 0) {
          const response = await TransactionService.findUnlockedForLocks(lockIds);
          const locksHash: { [key: string]: number } = {};

          // Fetch the corresponding timelock id for the claim / refund transactions
          for (const lockTransaction of response.data) {
            if (lockTransaction.type === CoreTransaction.TIMELOCK_REFUND) {
              locksHash[lockTransaction.asset.refund.lockTransactionId] = 10;
            } else {
              locksHash[lockTransaction.asset.claim.lockTransactionId] = 9;
            }
          }

          // Set an additional property on the locks that got claimed / refunded
          transactions = transactions.map((transaction: ITransaction) => {
            if (locksHash[transaction.id]) {
              return { ...transaction, lockStatus: locksHash[transaction.id] };
            }
            return transaction;
          });
        }
        this.transactions = transactions;
        return;
      } else {
        this.transactions = data.map((transaction: ITransaction) => ({ ...transaction, price: null }));
      }
    }
  }

  private async getReceivedCount() {
    if (this.wallet && this.wallet.address) {
      const response = await TransactionService.receivedByAddressCount(this.wallet.address);
      this.receivedCount = response;
    } else {
      this.receivedCount = 0;
    }
  }

  private async getSentCount() {
    if (this.wallet && this.wallet.address) {
      const response = await TransactionService.sentByAddressCount(this.wallet.address);
      this.sentCount = response;
    } else {
      this.sentCount = 0;
    }
  }

  private async getLocksCount() {
    if (this.wallet && this.wallet.address) {
      const response = await TransactionService.locksByAddressCount(this.wallet.address);
      this.locksCount = response;
    } else {
      this.locksCount = 0;
    }
  }

  private setType(type: string) {
    this.type = type;

    this.getTransactions();
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>

<style scoped>
.TransactionsNavigation {
  @apply .flex .items-end .mb-8 .border-b .whitespace-no-wrap .overflow-y-auto;
}

.TransactionsNavigation--tab {
  @apply .text-lg .text-theme-text-secondary .border-transparent .mr-4 .py-4 .px-2 .cursor-pointer .border-b-3;
}

.TransactionsNavigation--tab:hover {
  @apply .text-theme-text-primary .border-orange;
}

.TransactionsNavigation--tab.active {
  @apply .text-2xl .border-orange .text-theme-text-primary;
}

.TransactionsNavigation--tab.disabled {
  @apply .pointer-events-none .text-theme-text-tertiary;
}

.TransactionsNavigation--tab > span {
  @apply .text-xs .text-theme-text-tertiary;
}

.TransactionsNavigation--tab.active > span {
  @apply .text-theme-text-secondary;
}
</style>
