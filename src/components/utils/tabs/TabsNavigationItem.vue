<template>
  <div
    :class="{ 'TabsNavigationItem--active': isActive, 'TabsNavigationItem--disabled': isDisabled }"
    class="TabsNavigationItem transition"
    @click.capture.stop="onClick"
  >
    {{ title }}
    <span v-if="subTitle !== null">
      {{ subTitle }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TabsNavigationItem extends Vue {
  @Prop({ required: true }) public id: string;
  @Prop({ required: false, default: false }) public isActive: boolean;
  @Prop({ required: false, default: false }) public isDisabled: boolean;
  @Prop({ required: true }) public title: string;
  @Prop({ default: null }) public subTitle: string;

  private onClick() {
    this.$emit("click", this.id);
  }
}
</script>

<style scoped>
.TabsNavigationItem {
  @apply .text-lg .text-theme-text-secondary .border-transparent .mr-4 .py-4 .px-2 .cursor-pointer .border-b-3;
}

.TabsNavigationItem > span {
  @apply .text-xs .text-theme-text-tertiary;
}

.TabsNavigationItem:hover {
  @apply .text-theme-text-primary .border-blue;
}

.TabsNavigationItem--active {
  @apply .text-2xl .border-blue .text-theme-text-primary;
}

.TabsNavigationItem--active > span {
  @apply .text-theme-text-secondary;
}

.TabsNavigationItem--disabled {
  @apply .pointer-events-none .text-theme-text-tertiary;
}
</style>
