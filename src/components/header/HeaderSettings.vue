<template>
  <button class="px-2 py-4 hidden md:flex flex-none items-center border-b-2 mt-2px border-transparent hover:border-theme-accents hover:text-blue transition">
    <SvgIcon name="filter" view-box="0 0 16 20" />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HeaderSettings extends Vue {
}
</script>
