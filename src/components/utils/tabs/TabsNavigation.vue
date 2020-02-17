<template>
  <div class="flex flex-col sm:flex-row items-center mx-5 sm:mx-0">
    <nav class="TabsNavigation mx-5 md:mx-10 mb-4 sm:mb-8">
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
.TabsNavigation {
  @apply .flex .items-end .w-full .border-b;
}
</style>
