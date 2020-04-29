<template>
  <div>
    <Loader :data="bridgechains">
      <div v-for="bridgechain in bridgechains" :key="bridgechain.genesisHash" class="row-mobile">
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("PAGES.BRIDGECHAINS.NAME") }}
          </div>
          <div>
            <span>{{ bridgechain.name }}</span>
            <span v-if="bridgechain.isResigned" class="ml-2 rounded text-sm text-white bg-theme-resigned-label p-1">{{
              $t("PAGES.BRIDGECHAINS.RESIGNED")
            }}</span>
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("PAGES.BRIDGECHAINS.CREATOR") }}
          </div>
          <div><LinkWallet :address="bridgechain.publicKey" /></div>
        </div>

        <div :class="bridgechain.seedNodes ? 'list-row-border-b' : 'list-row'">
          <div class="mr-4">
            {{ $t("PAGES.BRIDGECHAINS.SEED_SERVER") }}
          </div>
          <div>{{ bridgechain.seedNodes[0] }}</div>
        </div>

        <div v-if="bridgechain.bridgechainRepository" class="list-row">
          <div class="mr-4">
            {{ $t("PAGES.BUSINESSES.REPOSITORY") }}
          </div>
          <div>
            <a :href="bridgechain.bridgechainRepository" target="_blank" rel="noopener noreferrer nofollow">{{
              bridgechain.bridgechainRepository
            }}</a>
          </div>
        </div>
      </div>
      <div v-if="bridgechains && !bridgechains.length" class="px-5 md:px-10">
        <span>{{ $t("COMMON.NO_RESULTS") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IBridgechain } from "@/interfaces";

@Component
export default class TableBridgechainMobile extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public bridgechains: IBridgechain[] | null;
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
