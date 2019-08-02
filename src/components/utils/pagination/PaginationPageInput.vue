<template>
  <div
    v-show="isVisible"
    class="Pagination__Input"
  >
    <div class="mr-auto p-2">
      HELLO
    </div>

    <button
      class="flex flex-none p-2 close-button"
      @click="emitClose"
    >
      <img src="@/assets/images/icons/cross.svg">
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'PaginationPageInput',

  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    emitPageChange () {
      this.$emit('page-change')
    },

    emitClose () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.Pagination__Input {
  @apply .flex .items-center .absolute .inset-0 .z-10 .bg-theme-button .px-3 .rounded;
}

.close-button img {
  width: 12px;
  height: 12px;
}
</style>
