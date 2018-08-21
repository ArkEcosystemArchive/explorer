<template>
  <div class="mx-5 sm:mx-10 mt-5 md:mt-10" :class="[ showPaginator ? 'flex flex-wrap' : 'hidden' ]">
    <button
      @click="prev"
      :class="{ 'hidden' : page <= 1, 'flex' : page > 1 }"
      class="mr-auto pager-button items-center">
      <svg
       class="inline"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       width="5px" height="8px">
      <path fill-rule="evenodd" fill="currentColor"
       d="M4.054,8.000 L5.000,7.067 L1.892,4.000 L5.000,0.933 L4.054,0.000 L-0.000,4.000 L4.054,8.000 Z"/>
      </svg>
      <span class="ml-2">{{ $t("Previous") }}</span>
    </button>

    <button
      @click="next"
      :class="{ 'hidden' : page >= totalPages, 'flex' : page < totalPages }"
      class="ml-auto pager-button items-center float-right">
      <span class="mr-2">{{ $t("Next") }}</span>
      <svg
       class="inline"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       width="5px" height="8px">
      <path fill-rule="evenodd" fill="currentColor"
       d="M0.946,-0.001 L-0.000,0.933 L3.107,4.000 L-0.000,7.066 L0.946,8.000 L4.999,4.000 L0.946,-0.001 Z"/>
      </svg>
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
    },

    showPaginator() {
      return this.count ? this.page > 1 || this.page < this.totalPages : true
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
      if (!this.count || this.page < this.totalPages) this.page++

      this.$parent.$emit('paginatorChanged', this.page)
    },
  },
}
</script>
