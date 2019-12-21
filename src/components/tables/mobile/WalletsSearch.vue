<template>
  <div>
    <Loader :data="wallets">
      <div v-for="row in wallets" :key="row.address" class="row-mobile">
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("WALLET.ADDRESS") }}
          </div>
          <LinkWallet :address="row.address" />
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("WALLET.VOTING_FOR") }}
          </div>
          <LinkWallet :address="votedDelegate(row.vote).address" />
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
          <div>{{ percentageString((row.balance / total) * 100) }}</div>
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

@Component
export default class TableWalletsSearchMobile extends Vue {
  @Prop({
    required: true,
    validator: value => {
      return Array.isArray(value) || value === null;
    },
  })
  public wallets: IWallet[] | null;
  @Prop({ required: true }) public total: number;

  private votedDelegate(vote) {
    return this.$store.getters["delegates/byPublicKey"](vote) || {};
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
