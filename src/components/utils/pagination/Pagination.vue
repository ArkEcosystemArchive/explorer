<template>
  <div class="flex flex-no-wrap justify-center mx-5 sm:mx-10 mt-5 md:mt-10">
    <button
      v-if="showFirst"
      class="pager-button mr-2"
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
    </button>

    <button
      v-if="showPrevious"
      class="pager-button mr-2"
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
      <span class="ml-2 hidden lg:inline">{{ $t('PAGINATION.PREVIOUS') }}</span>
    </button>

    <div
      v-click-outside="closePageInput"
      class="flex relative"
    >
      <PaginationPageInput
        :is-visible="showPageInput"
        :page-count="pageCount"
        class="Pagination__Input"
        @page-change="emitPageChange"
        @close="closePageInput"
      />

      <div
        :class="{ 'opacity-0': showPageInput }"
        class="hidden md:flex px-3 bg-theme-button rounded"
      >
        <PaginationSearchButton
          :is-visible="pageButtons[0] !== 1"
          @click="openPageInput"
        />

        <button
          v-for="page in pageButtons"
          :key="page"
          :disabled="page === currentPage"
          :class="{ 'active': page === currentPage }"
          class="Pagination__Button transition"
          @click="emitPageChange(page)"
        >
          <span>{{ page }}</span>
        </button>

        <PaginationSearchButton
          :is-visible="pageButtons[pageButtons.length - 1] !== pageCount"
          @click="openPageInput"
        />
      </div>

      <div class="flex md:hidden bg-theme-button rounded">
        <PaginationSearchButton
          :class="{ 'opacity-0': showPageInput }"
          :hover-scale="false"
          @click="openPageInput"
        >
          {{ $t('PAGINATION.PAGE') }} {{ currentPage }} {{ $t('PAGINATION.OF') }} {{ pageCount }}
        </PaginationSearchButton>
      </div>
    </div>

    <button
      v-if="showNext"
      class="pager-button ml-2"
      @click="emitNext"
    >
      <span class="mr-2 hidden lg:inline">{{ $t('PAGINATION.NEXT') }}</span>
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
      v-if="showLast"
      class="pager-button ml-2"
      @click="emitLast"
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
import { PaginationPageInput, PaginationSearchButton } from '@/components/utils/pagination'

export default {
  name: 'Pagination',

  components: {
    PaginationPageInput,
    PaginationSearchButton
  },

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

  data: () => ({
    pageInputVisible: false
  }),

  computed: {
    showPageInput () {
      return this.pageInputVisible
    },

    buttonCount () {
      return this.currentPage < 100 ? 7 : 5
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

    showFirst () {
      return !this.pageButtons.includes(1) && this.first !== this.previous
    },

    showPrevious () {
      return this.currentPage > 1
    },

    showNext () {
      return this.currentPage < this.pageCount
    },

    showLast () {
      return !this.pageButtons.includes(this.pageCount) && this.last !== this.next
    },

    subRangeLength () {
      return Math.floor(this.buttonCount / 2)
    },

    pageButtons () {
      let buttons

      if (this.pageCount <= this.buttonCount) {
        buttons = Array.apply(null, Array(this.pageCount)).map((_, i) => i + 1)
      } else if (this.currentPage <= this.subRangeLength + 1) {
        buttons = Array.apply(null, Array(this.buttonCount)).map((_, i) => i + 1)
      } else if (this.currentPage >= this.pageCount - this.subRangeLength) {
        buttons = Array.apply(null, Array(this.buttonCount)).map((_, i) => {
          return this.pageCount - this.buttonCount + i + 1
        })
      } else {
        buttons = Array.apply(null, Array(this.buttonCount)).map((_, i) => {
          return this.currentPage - this.subRangeLength + i
        })
      }

      return buttons
    }
  },

  methods: {
    emitFirst () {
      this.emitPageChange(1)
    },

    emitPrevious () {
      this.emitPageChange(this.currentPage - 1)
    },

    emitNext () {
      this.emitPageChange(this.currentPage + 1)
    },

    emitLast () {
      this.emitPageChange(this.pageCount)
    },

    emitPageChange (page) {
      this.$emit('page-change', page)
    },

    openPageInput () {
      this.pageInputVisible = true
    },

    closePageInput () {
      this.pageInputVisible = false
    }
  }
}
</script>

<style>
.Pagination__Button {
  @apply .text-theme-button-text .p-3 .cursor-pointer .flex .flex-no-wrap .items-center;
}

.Pagination__Button.active {
  @apply .bg-theme-button-active .text-theme-button-text;
}

.Pagination__Button:not(:disabled):hover {
  @apply .bg-blue .text-white .rounded;
  box-shadow: 0 5px 15px rgba(9, 100, 228, 0.34);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.Pagination__Button:disabled {
  @apply .text-theme-button-text;
}
</style>
