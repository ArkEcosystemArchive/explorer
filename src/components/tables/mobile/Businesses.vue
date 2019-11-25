<template>
  <div>
    <Loader :data="businesses">
      <div v-for="business in businesses" :key="business.name" class="row-mobile">
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("PAGES.BUSINESSES.NAME") }}
          </div>
          <div>{{ business.name }}</div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("PAGES.BUSINESSES.CREATOR") }}
          </div>
          <div><LinkWallet :address="business.address" /></div>
        </div>

        <div :class="business.repository ? 'list-row-border-b' : 'list-row'">
          <div class="mr-4">
            {{ $t("PAGES.BUSINESSES.WEBSITE") }}
          </div>
          <div>{{ business.website }}</div>
        </div>

        <div v-if="business.repository" class="list-row">
          <div class="mr-4">
            {{ $t("PAGES.BUSINESSES.REPOSITORY") }}
          </div>
          <div>{{ business.repository }}</div>
        </div>
      </div>
      <div v-if="businesses && !businesses.length" class="px-5 md:px-10">
        <span>{{ $t("COMMON.NO_RESULTS") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IBusiness } from "@/interfaces";

@Component
export default class TableBusinessesMobile extends Vue {
  @Prop({
    required: true,
    validator: value => {
      return Array.isArray(value) || value === null;
    },
  })
  public businesses: IBusiness[] | null;
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
