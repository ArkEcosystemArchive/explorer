<template>
  <li
    class="ListDividedItem flex flex-col py-4 w-full border-b border-dashed border-theme-line-separator"
  >
    <div class="flex justify-between items-center">
      <span
        :class="itemLabelClass"
        class="ListDividedItem__label text-theme-page-text-light mr-5"
      >{{ label }}</span>

      <div :class="itemValueClass" class="ListDividedItem__value">
        <slot>
          <span v-if="value" class="text-theme-page-text">{{ value }}</span>
        </slot>
      </div>
    </div>
    <div v-if="$slots.content" class="mt-4">
      <slot name="content" />
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ListDividedItem extends Vue {
  @Prop({ required: true }) public label!: string;
  @Prop({ default: null }) public value!: string | number | null;
  @Prop({ default: "" }) public itemLabelClass!: string;
  @Prop({ default: "" }) public itemValueClass!: string;
}
</script>
