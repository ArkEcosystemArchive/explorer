<template>
  <div class="HeaderMenuDesktop md:px-8 sm:flex xl:rounded-r-md">
    <button
      class="px-4 py-3 md:py-6 flex-none flex items-center border-b-2 mt-2px mr-3 border-transparent hover:border-red text-theme-text-secondary"
      @click="closeMenu"
    >
      <!-- Inline this SVG so we can change color dynamically -->
      <svg
        class="flex-none fill-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="15px"
        height="13px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M13.499,3.000 L1.499,3.000 C0.671,3.000 -0.001,2.328 -0.001,1.500 C-0.001,0.671 0.671,-0.000 1.499,-0.000 L13.499,-0.000 C14.328,-0.000 14.999,0.671 14.999,1.500 C14.999,2.328 14.328,3.000 13.499,3.000 ZM1.499,5.000 L7.499,5.000 C8.328,5.000 9.000,5.671 9.000,6.500 C9.000,7.328 8.328,8.000 7.499,8.000 L1.499,8.000 C0.671,8.000 -0.001,7.328 -0.001,6.500 C-0.001,5.671 0.671,5.000 1.499,5.000 ZM1.499,10.000 L9.499,10.000 C10.328,10.000 11.000,10.671 11.000,11.500 C11.000,12.328 10.328,13.000 9.499,13.000 L1.499,13.000 C0.671,13.000 -0.001,12.328 -0.001,11.500 C-0.001,10.671 0.671,10.000 1.499,10.000 Z"
        />
      </svg>
    </button>

    <RouterLink
      :to="{ name: 'home' }"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t('PAGES.HOME.TITLE') }}
    </RouterLink>

    <RouterLink
      :to="{ name: 'top-wallets', params: { page: 1 } }"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t('PAGES.TOP_WALLETS.TITLE') }}
    </RouterLink>

    <RouterLink
      :to="{ name: 'delegate-monitor' }"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t('PAGES.DELEGATE_MONITOR.TITLE') }}
    </RouterLink>

    <div class="flex-auto" />
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'HeaderMenuDesktop',

  methods: {
    closeMenu () {
      this.$store.dispatch('ui/setMenuVisible', false)
    }
  }
}
</script>

<style>
  .HeaderMenuDesktop {
    @apply .absolute .inset-0 .px-4 .hidden .bg-theme-nav-background
  }
</style>
