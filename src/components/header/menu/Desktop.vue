<template>
  <div class="absolute pin px-4 md:px-8 hidden sm:flex bg-theme-nav-background xl:rounded-r-md">
    <button @click="closeMenu" class="px-2 border-b-2 border-transparent hover:border-red">
      <img src="@/assets/images/icons/cross.svg" />
    </button>
    <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4"></span>

    <router-link @click.native="closeMenu" :to="{ name: 'home' }" tag="button" class="menu-button">{{ $t("Home") }}</router-link>
    <router-link @click.native="closeMenu" :to="{ name: 'top-wallets', params: { page: 1 } }" tag="button" class="menu-button">{{ $t("Top Wallets") }}</router-link>
    <router-link @click.native="closeMenu" :to="{ name: 'delegate-monitor' }" tag="button" class="menu-button">{{ $t("Delegate Monitor") }}</router-link>
    <!-- <router-link :to="{ name: 'statistics' }" tag="button" class="menu-button">Statistics</router-link> -->

    <div class="flex-auto"></div>

    <!-- <a href="#" class="menu-button">
      <span class="mr-2">Snapshots</span>
      <img src="@/assets/images/icons/download.svg" />
    </a> -->
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  methods: {
    closeMenu() {
      this.$store.dispatch('ui/setMenuVisible', false)
    }
  }
}
</script>
