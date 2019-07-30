<template>
  <div class="flex flex-no-wrap mx-5 sm:mx-10 mt-5 md:mt-10">
    <button
      :disabled="self === first"
      class="pager-button mr-1 hidden xl:flex"
      @click="emitFirst"
    >
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="8px"
        height="8px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="m4.054,8l0.946,-0.933l-3.108,-3.067l3.108,-3.067l-0.946,-0.933l-4.054,4l4.054,4z"
        />
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="m7.054,8l0.946,-0.933l-3.108,-3.067l3.108,-3.067l-0.946,-0.933l-4.054,4l4.054,4z"
        />
      </svg>
      <span class="ml-2">{{ $t("First") }}</span>
    </button>

    <button
      :disabled="self === first"
      class="mr-auto xl:ml-0 pager-button"
      @click="emitPrevious"
    >
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="5px"
        height="8px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M4.054,8.000 L5.000,7.067 L1.892,4.000 L5.000,0.933 L4.054,0.000 L-0.000,4.000 L4.054,8.000 Z"
        />
      </svg>
      <span class="ml-2">{{ $t("Previous") }}</span>
    </button>

    <button
      v-for="page in pageButtons"
      :key="page"
      :disabled="isSpacer(page) || page === currentPage"
      :class="{ 'flex-1' : !isSpacer(page) }"
      class="pager-button ml-1 p-4 hidden xl:flex"
      @click="emitPageChange(page)"
    >
      <span
        :class="{ 'border-b': currentPage === page }"
        class="px-1"
      >
        {{ page }}
      </span>
    </button>

    <button
      :disabled="self === last"
      class="ml-auto xl:ml-1 pager-button"
      @click="emitNext"
    >
      <span class="mr-2">{{ $t("Next") }}</span>
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="5px"
        height="8px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M0.946,-0.001 L-0.000,0.933 L3.107,4.000 L-0.000,7.066 L0.946,8.000 L4.999,4.000 L0.946,-0.001 Z"
        />
      </svg>
    </button>

    <button
      :disabled="self === last"
      class="pager-button ml-1 hidden xl:flex"
      @click="emitLast"
    >
      <span class="mr-2">{{ $t("Last") }}</span>
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="8px"
        height="8px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="m0.946,-0.001l-0.946,0.934l3.107,3.067l-3.107,3.066l0.946,0.934l4.053,-4l-4.053,-4.001z"
        />
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="m3.946,0l-0.946,0.934l3.107,3.067l-3.107,3.066l0.946,0.934l4.053,-4l-4.053,-4.001z"
        />
      </svg>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Paginator',

  props: {
    meta: {
      type: Object,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },

  computed: {
    buttonCount () {
      return this.currentPage < 100 ? 9 : (this.currentPage < 10000 ? 7 : 5)
    },

    pageCount () {
      return this.meta.pageCount
    },

    next () {
      return this.meta.next
    },

    previous () {
      return this.meta.previous
    },

    self () {
      return this.meta.self
    },

    first () {
      return this.meta.first
    },

    last () {
      return this.meta.last
    },

    subRangeLength () {
      return Math.floor(this.buttonCount / 2)
    },

    pageButtons () {
      let buttons

      if (this.pageCount <= this.buttonCount) {
        buttons = Array.apply(null, Array(this.pageCount)).map((_, i) => i + 1)
      } else if (this.currentPage <= this.subRangeLength + 1) {
        buttons = Array.apply(null, Array(this.buttonCount + 1)).map((_, i) => i + 1).concat('...')
      } else if (this.currentPage >= this.pageCount - this.subRangeLength) {
        buttons = ['...', ...Array.apply(null, Array(this.buttonCount + 1)).map((_, i) => {
          return this.pageCount - this.buttonCount + i
        })]
      } else {
        buttons = ['...', ...Array.apply(null, Array(this.buttonCount)).map((_, i) => {
          return this.currentPage - this.subRangeLength + i
        }), '...']
      }

      return buttons
    }
  },

  methods: {
    emitPageChange (page) {
      this.$emit('page-change', page)
    },

    emitNext () {
      this.emitPageChange(this.currentPage + 1)
    },

    emitPrevious () {
      this.emitPageChange(this.currentPage - 1)
    },

    emitFirst () {
      this.emitPageChange(1)
    },

    emitLast () {
      this.emitPageChange(this.pageCount)
    },

    isSpacer (value) {
      return !Number(value)
    }
  }
}
</script>
