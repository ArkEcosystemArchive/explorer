<template>
  <span>
    <RouterLink :to="{ name: 'block', params: { id } }" class="hidden md:inline-block">
      <span v-if="hasDefaultSlot">
        <slot />
      </span>
      <span v-else v-tooltip="id">{{ truncate(id, length) }}</span>
    </RouterLink>
    <RouterLink :to="{ name: 'block', params: { id } }" class="md:hidden">
      <span v-tooltip="id">{{ truncate(id) }}</span>
    </RouterLink>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LinkBlock extends Vue {
  @Prop({ required: true }) public id: string;
  @Prop({ required: false, default: 13 }) public length: number;

  get hasDefaultSlot(): boolean {
    return !!this.$slots.default;
  }
}
</script>
