<template>
  <button
    v-if="isVisible"
    :class="{ 'hover-scale': hoverScale }"
    class="Pagination__Button--search transition"
    @click="emitClick"
  >
    <span v-if="hasDefaultSlot">
      <slot />
    </span>

    <span v-else>...</span>

    <span class="icon">
      <svg
        class="fill-current"
        width="16"
        height="16"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z" />
      </svg>
    </span>
  </button>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'PaginationSearchButton',

  props: {
    isVisible: {
      type: Boolean,
      required: false,
      default: true
    },

    hoverScale: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  },

  methods: {
    emitClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.Pagination__Button--search {
  @apply .relative .text-theme-button-text .p-3 .cursor-pointer .flex .flex-no-wrap .items-center;;
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
