<template>
  <span v-tooltip="smartBridge">
    <router-link :to="{ name: 'transaction', params: { id } }" class="hidden md:inline-block whitespace-no-wrap">
      <span v-if="hasDefaultSlot"><slot></slot></span>
      <span v-else>{{ truncate(id) }}</span>
    </router-link>
    <router-link :to="{ name: 'transaction', params: { id } }" class="md:hidden whitespace-no-wrap">
      <span>{{ truncate(id) }}</span>
    </router-link>
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    smartBridge: {
      type: String,
      required: false,
    },
  },

  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    },
  },
}
</script>
