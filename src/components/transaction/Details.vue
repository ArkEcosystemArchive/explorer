<template>
  <section class="page-section py-5 md:py-10 mb-5">
    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("TRANSACTION.SENDER") }}
        </div>
        <div class="truncate">
          <LinkWallet :address="transaction.sender" :trunc="false" tooltip-placement="left" />
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("TRANSACTION.RECIPIENT") }}
        </div>
        <div class="truncate">
          <LinkWallet
            :address="transaction.recipient"
            :type="transaction.type"
            :asset="transaction.asset"
            :trunc="false"
            tooltip-placement="left"
          />
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("COMMON.CONFIRMATIONS") }}
        </div>
        <div>{{ confirmations }}</div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("TRANSACTION.AMOUNT") }}
        </div>
        <div
          v-if="transaction.type === 6"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(multipaymentAmount, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(multipaymentAmount) }}
        </div>
        <div
          v-else
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(transaction.amount, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(transaction.amount) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("TRANSACTION.FEE") }}
        </div>
        <div
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(transaction.fee, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(transaction.fee) }}
        </div>
      </div>

      <div class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("COMMON.TIMESTAMP") }}
        </div>
        <div v-if="transaction.timestamp">
          {{ readableTimestamp(transaction.timestamp.unix) }}
        </div>
      </div>

      <div v-if="transaction.vendorField" class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("TRANSACTION.SMARTBRIDGE") }}
        </div>
        <div class="overflow-hidden break-words">
          {{ emojify(transaction.vendorField) }}
        </div>
      </div>

      <div v-if="transaction.nonce" class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("TRANSACTION.NONCE") }}
        </div>
        <div>
          {{ transaction.nonce }}
        </div>
      </div>

      <div v-if="transaction.type === 5" class="list-row-border-b">
        <div class="mr-4">
          {{ $t("TRANSACTION.IPFS") }}
        </div>
        <div class="overflow-hidden break-all">
          {{ transaction.asset.ipfs }}
        </div>
      </div>

      <div v-if="transaction.type === 8">
        <div v-if="transaction.asset.lock.expiration.type === 1" class="list-row-border-b">
          <div class="mr-4">
            {{ $t("TRANSACTION.TIMELOCK.EXPIRATION") }}
          </div>
          <div>
            {{ readableTimestampFromEpoch(transaction.asset.lock.expiration.value) }}
          </div>
        </div>
        <div v-else-if="transaction.asset.lock.expiration.type === 2" class="list-row-border-b">
          <div class="mr-4">
            {{ $t("TRANSACTION.TIMELOCK.BLOCKHEIGHT") }}
          </div>
          <div v-tooltip="{
            trigger: 'hover click',
            content: readableTimestampFromBlockheight(transaction.asset.lock.expiration.value),
            placement: 'left',
          }">
            {{ transaction.asset.lock.expiration.value }}
          </div>
        </div>
      </div>

      <div v-if="transaction.type === 9 || transaction.type === 10" class="list-row-border-b">
        <div class="mr-4">
          {{ transaction.type === 9 ? $t("TRANSACTION.TIMELOCK.CLAIMED") : $t("TRANSACTION.TIMELOCK.REFUND") }}
        </div>
        <div class="overflow-hidden break-all">
          <LinkTransaction :id="transaction.asset.refund.lockTransactionId" />
        </div>
      </div>

      <div class="list-row">
        <div class="mr-4">
          {{ $t("TRANSACTION.BLOCK_ID") }}
        </div>
        <div>
          <LinkBlock v-if="transaction.blockId" :id="transaction.blockId">
            {{ transaction.blockId }}
          </LinkBlock>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { ITransaction } from "@/interfaces";
import { LinkTransaction } from "@/components/links";
import CryptoCompareService from "@/services/crypto-compare";

@Component({
  components: {
    LinkTransaction,
  },
  computed: {
    ...mapGetters("currency", { currencySymbol: "symbol" }),
    ...mapGetters("network", ["height"]),
  },
})
export default class TransactionDetails extends Vue {
  @Prop({ required: true }) public transaction: ITransaction;

  private initialBlockHeight: number = 0;
  private price: number | null = 0;
  private currencySymbol: string;
  private height: number;
  private multipaymentAmount: number | null = null;

  get confirmations() {
    return this.initialBlockHeight ? this.height - this.initialBlockHeight : this.transaction.confirmations;
  }

  @Watch("transaction")
  public async onTransactionChanged() {
    this.updatePrice();
    this.handleMultipayment();
    this.setInitialBlockHeight();
  }

  @Watch("currencySymbol")
  public async onCurrencySymbolChanged() {
    await this.updatePrice();
  }

  @Watch("height")
  public onHeightChanged(newValue: number, oldValue: number) {
    if (!oldValue) {
      this.setInitialBlockHeight();
    }
  }

  public async mounted() {
    this.updatePrice();
    this.handleMultipayment();
  }

  private async updatePrice() {
    this.price = await CryptoCompareService.dailyAverage(this.transaction.timestamp.unix);
  }

  private setInitialBlockHeight() {
    this.initialBlockHeight = this.height - this.transaction.confirmations;
  }

  private handleMultipayment() {
    if (this.transaction.type === 6) {
      // @ts-ignore
      this.multipaymentAmount = this.calculateMultipaymentAmount(this.transaction);
    }
  }
}
</script>

<style scoped>
.list-row-border-b-no-wrap > div:last-child {
  text-align: right;
}
</style>
