<template>
  <button v-if="isVisible" :class="`Pagination__Button--${type} pager-button`" @click="emitClick">
    <span v-if="type === 'next'" class="hidden mr-1 lg:inline">
      {{ $t(`PAGINATION.${type.toUpperCase()}`) }}
    </span>

    <SvgIcon :name="`pagination/${type}`" view-box="0 0 13 13" />

    <span v-if="type === 'previous'" class="hidden ml-1 lg:inline">
      {{ $t(`PAGINATION.${type.toUpperCase()}`) }}
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PaginationNavigationButton extends Vue {
  @Prop({ required: true }) public isVisible: boolean;
  @Prop({ required: true }) public type: string;

  private emitClick() {
    this.$emit("click");
  }
}
</script>
