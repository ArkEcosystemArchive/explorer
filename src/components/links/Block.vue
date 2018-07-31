<template>
  <span>
    <router-link :to="{ name: 'block', params: { id } }" class="hidden md:inline-block">
      <span v-if="hasDefaultSlot"><slot></slot></span>
      <span v-tooltip="id" v-else>{{ truncate(id) }}</span>
    </router-link>
    <router-link :to="{ name: 'block', params: { id } }" class="md:hidden">
      <span v-tooltip="id">{{ truncate(id) }}</span>
    </router-link>
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>
