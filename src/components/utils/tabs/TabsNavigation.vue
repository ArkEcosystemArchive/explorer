<template>
  <div class="TabsNavigation flex flex-col w-full overflow-x-scroll sm:flex-row items-center px-5 sm:px-0">
    <nav class="TabsNavigation__nav mx-5 sm:mx-10 mb-4 sm:mb-8">
      <slot />
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TabsNavigation extends Vue {}
</script>

<style>
.TabsNavigation__nav {
  @apply .flex .items-end .w-full .border-b;
}
</style>
