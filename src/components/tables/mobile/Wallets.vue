<template>
  <div>
    <Loader :data="wallets">
      <div v-for="(row, index) in wallets" :key="row.address" class="row-mobile">
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("COMMON.RANK") }}
          </div>
          <div>{{ getRank(index) }}</div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("WALLET.ADDRESS") }}
          </div>
          <LinkWallet :key="row.address" :address="row.address" />
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("COMMON.BALANCE") }}
          </div>
          <div>{{ readableCrypto(row.balance) }}</div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t("COMMON.SUPPLY") }}
          </div>
          <div>{{ supplyPercentage(row.balance) }}</div>
        </div>
      </div>
      <div v-if="wallets && !wallets.length" class="px-5 md:px-10">
        <span>{{ $t("COMMON.NO_RESULTS") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";
import { mapGetters } from "vuex";
import { BigNumber } from "@/utils";
import { paginationLimit } from "@/constants";

@Component({
  computed: {
    ...mapGetters("network", ["supply"]),
  },
})
export default class TableWalletsMobile extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public wallets: IWallet[] | null;
  @Prop({ required: true }) public total: number;

  private supply: string;

  public supplyPercentage(balance: string): string {
    // @ts-ignore
    return this.percentageString(BigNumber.make(balance).dividedBy(this.total).times(100).toNumber());
  }

  private getRank(index: number) {
    const page = Number(this.$route.params.page) > 1 ? Number(this.$route.params.page) - 1 : 0;

    return page * paginationLimit + (index + 1);
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
