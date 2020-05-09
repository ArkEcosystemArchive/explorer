<template>
  <ul class="ListDivided list-reset w-full">
    <template v-if="items">
      <ListDividedItem v-for="(value, key) in items" :key="key" :label="key" :value="value" />
    </template>
    <template v-else>
      <slot />
    </template>
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
