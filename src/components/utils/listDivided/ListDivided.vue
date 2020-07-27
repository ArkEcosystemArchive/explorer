<template>
  <ul class="w-full ListDivided list-reset">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ListDividedItem from "./ListDividedItem.vue";

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
