<template>
  <section class="py-5 mb-5 page-section md:py-10">
    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("COMMON.TRANSACTIONS") }}
        </div>
        <div>{{ block.transactions }}</div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("COMMON.CONFIRMATIONS") }}
        </div>
        <div v-if="confirmations >= 0">
          {{ readableNumber(confirmations) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("COMMON.HEIGHT") }}
        </div>
        <div>{{ readableNumber(block.height) }}</div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("BLOCK.REWARD") }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.reward, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(block.forged.reward) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("BLOCK.FEES") }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.fee, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(block.forged.fee) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("BLOCK.TOTAL_FORGED") }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.total, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(block.forged.total) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("BLOCK.PROCESSED_AMOUNT") }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.amount, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(block.forged.amount) }}
        </div>
      </div>

      <div class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("COMMON.TIMESTAMP") }}
        </div>
        <div v-if="block.timestamp" class="text-right">
          {{ readableTimestamp(block.timestamp.unix) }}
        </div>
      </div>

      <div class="list-row">
        <div class="mr-4">
          {{ $t("BLOCK.GENERATED_BY") }}
        </div>
        <div v-if="block.generator">
          <LinkWallet :address="block.generator.address" tooltip-placement="left" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import CryptoCompareService from "@/services/crypto-compare";
import { IBlock } from "../../interfaces";

@Component({
  computed: {
    ...mapGetters("currency", { currencySymbol: "symbol" }),
    ...mapGetters("network", ["height"]),
  },
})
export default class BlockDetails extends Vue {
  @Prop({ required: true }) public block: IBlock;

  private price: number | null = 0;
  private currencySymbol: string;
  private height: number;

  get confirmations(): number {
    return this.height - this.block.height;
  }

  @Watch("block")
  public onBlockChanged() {
    this.updatePrice();
  }

  @Watch("currencySymbol")
  public onCurrencySymbolChanged() {
    this.updatePrice();
  }

  private async updatePrice(): Promise<void> {
    if (!this.block.id) {
      return;
    }

    this.price = await CryptoCompareService.dailyAverage(this.block.timestamp.unix);
  }
}
</script>
