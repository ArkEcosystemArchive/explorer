<template>
  <li class="flex flex-col w-full py-4 border-b border-dashed ListDividedItem border-theme-line-separator">
    <div class="flex justify-between">
      <div class="flex flex-col ListDividedItem__container__label">
        <span :class="itemLabelClass" class="ListDividedItem__label">{{ label }}</span>
        <span v-if="labelDescription" :class="itemLabelDescriptionClass" class="ListDividedItem__label__description">{{
          labelDescription
        }}</span>
      </div>
      <div :class="itemValueClass" class="ListDividedItem__value">
        <slot />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ListDividedItem extends Vue {
  @Prop({ required: true }) public label!: string;
  @Prop({ default: null }) public labelDescription!: string | null;
  @Prop({ default: "" }) public itemLabelClass!: string;
  @Prop({ default: "" }) public itemLabelDescriptionClass!: string;
  @Prop({ default: "" }) public itemValueClass!: string;
}
</script>

<style scoped>
.ListDividedItem__label {
  @apply .font-semibold .text-lg;
  color: var(--color-theme-text-secondary);
}

.ListDividedItem__label__description {
  @apply .mt-2 .font-semibold .text-sm;
  color: var(--color-theme-text-placeholder);
}
</style>
