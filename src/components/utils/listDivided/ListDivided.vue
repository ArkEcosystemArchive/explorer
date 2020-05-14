<template>
  <ul class="ListDivided list-reset w-full">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ListDividedItem } from "@/components/utils/listDivided";

@Component({
  components: {
    ListDividedItem,
  },
})
export default class ListDivided extends Vue {}
</script>

<style>
.ListDivided > .ListDividedItem:last-child {
  border-bottom-color: transparent;
}
</style>
