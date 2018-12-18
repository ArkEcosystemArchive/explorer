<template>
  <ul class="menu-container w-full max-w-480px bg-table-row list-reset absolute pin-b pin-l py-5 block xl:hidden">
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <router-link :to="{ name: 'home' }" tag="div" class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border vertical-middle">
        <img src="@/assets/images/icons/web-page-home.svg" class="genki-menu-button-img"/>
        {{ $t("Home") }}
      </router-link>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <router-link :to="{ name: 'top-wallets', params: { page: 1 } }" tag="div" class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border vertical-middle">
        <img src="@/assets/images/icons/starred-badge.svg" class="genki-menu-button-img"/>
        <span style="vertical-align: middle;">{{ $t("Top Wallets") }}</span>
      </router-link>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <router-link :to="{ name: 'delegate-monitor' }" tag="div" class="cursor-pointer py-5 w-64 flex-none vertical-middle">
        <img src="@/assets/images/icons/monitoring.svg" class="genki-menu-button-img"/>
        {{ $t("Delegate Monitor") }}
      </router-link>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <a href="https://wallet.ki" class="cursor-pointer py-5 w-64 flex-none vertical-middle genki-menu-button" target="_blank">
      <img src="@/assets/images/icons/wallet.svg" class="genki-menu-button-img"/>
      <span class="mr-2">Wallet</span>
    </a>
    </li>
    <!-- <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <router-link :to="{ name: 'statistics' }" tag="div" class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border">Statistics</router-link>
    </li> -->
    <!-- <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <div class="py-5 w-64 flex-none">
        <span class="mr-2">Snapshots</span>
        <img src="@/assets/images/icons/download.svg" />
      </div>
    </li> -->
  </ul>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('ui', ['nightMode'])
  }
}
</script>

<style>
.menu-container {
  transform: translateY(100%);
}
</style>
