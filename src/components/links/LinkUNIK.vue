<template>
  <span>
    <RouterLink :to="{ name: 'unik', params: { id } }" class="hidden md:inline-block">
      <span v-if="length" v-tooltip="id">{{ truncate(id, length) }}</span>
      <span v-else>{{ id }}</span>
    </RouterLink>
    <RouterLink :to="{ name: 'block', params: { id } }" class="md:hidden">
      <span v-tooltip="id">{{ truncate(id) }}</span>
    </RouterLink>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class LinkUNIK extends Vue {
  @Prop({ required: true }) public id: string;
  @Prop({ required: false, default: 0 }) public length: number;
}
</script>
