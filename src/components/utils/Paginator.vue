<template>
  <div class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
    <button
      @click="prev"
      :class="{ 'hidden' : page <= 1 }"
      class="mr-auto pager-button">
      {{ $t("Previous") }}
    </button>

    <button
      @click="next"
      :class="{ 'hidden' : page >= totalPages }"
      class="ml-auto pager-button float-right">
      {{ $t("Next") }}
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    start: {
      type: Number,
      require: true,
    },
    perPage: {
      type: Number,
      default: 25
    },
    count: {
      type: Number
    }
  },

  data: () => ({
    page: 1,
  }),

  computed: {
    totalPages() {
      return Math.ceil(this.count / this.perPage)
    }
  },

  mounted() {
    this.page = this.start
  },

  methods: {
    prev() {
      if (this.page > 1) this.page--

      this.$parent.$emit('paginatorChanged', this.page)
    },

    next() {
      this.page++

      this.$parent.$emit('paginatorChanged', this.page)
    },
  },
}
</script>
