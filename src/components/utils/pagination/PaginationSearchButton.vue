<template>
  <button
    v-if="isVisible"
    :class="{ 'hover-scale': hoverScale }"
    class="transition Pagination__Button--search"
    @click="emitClick"
  >
    <span v-if="hasDefaultSlot">
      <slot />
    </span>

    <span v-else>...</span>

    <span class="icon">
      <SvgIcon name="search" view-box="0 0 13 13" />
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PaginationSearchButton extends Vue {
  @Prop({ required: false, default: true }) public isVisible: boolean;
  @Prop({ required: false, default: true }) public hoverScale: boolean;

  get hasDefaultSlot() {
    return !!this.$slots.default;
  }

  private emitClick() {
    this.$emit("click");
  }
}
</script>

<style scoped>
.Pagination__Button--search {
  @apply .relative .text-theme-button-text .p-3 .cursor-pointer .flex .flex-no-wrap .items-center;
}

.Pagination__Button--search:hover {
  @apply .bg-blue .text-white .rounded;
  box-shadow: 0 5px 15px rgba(9, 100, 228, 0.34);
}

.Pagination__Button--search .icon {
  @apply .hidden .absolute;
  left: 50%;
}

.Pagination__Button--search .icon svg {
  @apply .relative;
  left: -50%;
}

.Pagination__Button--search:hover span:not(.icon) {
  @apply .opacity-0;
}

.Pagination__Button--search:hover .icon {
  @apply .block;
}

.hover-scale:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
