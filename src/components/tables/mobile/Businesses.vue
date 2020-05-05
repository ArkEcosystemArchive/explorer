<template>
  <div>
    <Loader :data="businesses">
      <div v-for="(business, index) in businesses" :key="index" class="row-mobile">
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("PAGES.BUSINESSES.NAME") }}
          </div>
          <div>
            <span>{{ business.name }}</span>
            <span v-if="business.isResigned" class="ml-2 rounded text-sm text-white bg-theme-resigned-label p-1">{{
              $t("PAGES.BUSINESSES.RESIGNED")
            }}</span>
          </div>
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
          <div>
            <a :href="business.website" target="_blank" rel="noopener noreferrer nofollow">{{ business.website }}</a>
          </div>
        </div>

        <div v-if="business.repository" class="list-row">
          <div class="mr-4">
            {{ $t("PAGES.BUSINESSES.REPOSITORY") }}
          </div>
          <div>
            <a :href="business.repository" target="_blank" rel="noopener noreferrer nofollow">{{
              business.repository
            }}</a>
          </div>
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
    validator: (value) => {
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
