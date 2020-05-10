<template>
  <ul class="ListDivided list-reset w-full">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ListDividedItem } from "@/components/utils/listDivided";

@Component({
  components: {
    ListDividedItem,
  },
})
export default class ListDivided extends Vue {
  @Prop({ default: null }) public items!: object | null;
}
</script>

<style>
.ListDivided > .ListDividedItem:last-child {
  border-bottom-color: transparent;
}
</style>
