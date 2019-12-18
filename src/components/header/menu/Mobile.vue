<template>
  <ul class="menu-container w-full max-w-480px bg-table-row absolute bottom-0 left-0 py-5 block xl:hidden">
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'home' }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.HOME.TITLE") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'top-wallets', params: { page: 1 } }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.TOP_WALLETS.TITLE") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'delegate-monitor' }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.DELEGATE_MONITOR.TITLE") }}
      </RouterLink>
    </li>
    <li v-if="hasMagistrateEnabled" :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'bridgechains', params: { page: 1 } }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.BRIDGECHAINS.TITLE") }}
      </RouterLink>
    </li>
    <li v-if="hasMagistrateEnabled" :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink :to="{ name: 'businesses', params: { page: 1 } }" tag="div" class="cursor-pointer py-5 w-64 flex-none">
        {{ $t("PAGES.BUSINESSES.TITLE") }}
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
    ...mapGetters("network", ["hasMagistrateEnabled"]),
  },
})
export default class HeaderMenuMobile extends Vue {
  private nightMode: boolean;
}
</script>

<style>
.menu-container {
  transform: translateY(100%);
}
</style>
