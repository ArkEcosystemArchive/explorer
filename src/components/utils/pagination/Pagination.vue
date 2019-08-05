<template>
  <div class="Pagination mx-5 sm:mx-10 mt-5 md:mt-10">
    <button
      v-if="showFirst"
      class="Pagination__Button--first pager-button mr-2"
      @click="emitFirst"
    >
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="13px"
        height="13px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M8.1,6.5l3.7-4c0.3-0.3,0.3-0.9,0-1.3c-0.3-0.3-0.9-0.3-1.2,0L6.3,5.9c-0.3,0.3-0.3,0.9,0,1.2l4.3,4.6c0.2,0.2,0.4,0.3,0.6,0.3c0.2,0,0.4-0.1,0.6-0.3c0.3-0.3,0.3-0.9,0-1.3L8.1,6.5z M3.1,6.5l3.7-4c0.3-0.3,0.3-0.9,0-1.3c-0.3-0.3-0.9-0.3-1.2,0L1.3,5.9c-0.3,0.3-0.3,0.9,0,1.2l4.3,4.6C5.7,11.9,5.9,12,6.1,12c0.2,0,0.4-0.1,0.6-0.3c0.3-0.3,0.3-0.9,0-1.3L3.1,6.5z"
        />
      </svg>
    </button>

    <button
      v-if="showPrevious"
      class="Pagination__Button--previous pager-button mr-2"
      @click="emitPrevious"
    >
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="13px"
        height="13px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M6.1,6.5l3.7-4c0.3-0.3,0.3-0.9,0-1.3c-0.3-0.3-0.9-0.3-1.2,0L4.3,5.9c-0.3,0.3-0.3,0.9,0,1.2l4.3,4.6C8.7,11.9,8.9,12,9.1,12c0.2,0,0.4-0.1,0.6-0.3c0.3-0.3,0.3-0.9,0-1.3L6.1,6.5z"
        />
      </svg>
      <span class="ml-1 hidden lg:inline">{{ $t('PAGINATION.PREVIOUS') }}</span>
    </button>

    <div
      v-click-outside="closePageInput"
      class="flex relative"
    >
      <PaginationPageInput
        :is-visible="showPageInput"
        :page-count="pageCount"
        :is-mobile="isMobile"
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
      class="Pagination__Button--next pager-button ml-2"
      @click="emitNext"
    >
      <span class="mr-1 hidden lg:inline">{{ $t('PAGINATION.NEXT') }}</span>
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="13px"
        height="13px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M9.7,5.9L5.5,1.3c-0.3-0.3-0.9-0.3-1.2,0c-0.3,0.3-0.3,0.9,0,1.3l3.7,4l-3.7,4c-0.3,0.3-0.3,0.9,0,1.3C4.4,11.9,4.6,12,4.9,12c0.2,0,0.4-0.1,0.6-0.3l4.3-4.6C10.1,6.8,10.1,6.2,9.7,5.9z"
        />
      </svg>
    </button>

    <button
      v-if="showLast"
      class="Pagination__Button--last pager-button ml-2"
      @click="emitLast"
    >
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="13px"
        height="13px"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M6.7,5.9L2.5,1.3c-0.3-0.3-0.9-0.3-1.2,0c-0.3,0.3-0.3,0.9,0,1.3l3.7,4l-3.7,4c-0.3,0.3-0.3,0.9,0,1.3C1.4,11.9,1.6,12,1.9,12c0.2,0,0.4-0.1,0.6-0.3l4.3-4.6C7.1,6.8,7.1,6.2,6.7,5.9z M11.7,5.9L7.5,1.3c-0.3-0.3-0.9-0.3-1.2,0s-0.3,0.9,0,1.3l3.7,4l-3.7,4c-0.3,0.3-0.3,0.9,0,1.3C6.4,11.9,6.6,12,6.9,12c0.2,0,0.4-0.1,0.6-0.3l4.3-4.6C12.1,6.8,12.1,6.2,11.7,5.9z"
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
    pageInputVisible: false,
    mobileView: false
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
      return (this.first !== this.previous && !this.pageButtons.includes(1)) || (this.first !== this.self && this.isMobile)
    },

    showPrevious () {
      return this.currentPage > 1
    },

    showNext () {
      return this.currentPage < this.pageCount
    },

    showLast () {
      return (this.last !== this.next && !this.pageButtons.includes(this.pageCount)) || (this.last !== this.self && this.isMobile)
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
    },

    isMobile () {
      return this.mobileView
    }
  },

  mounted () {
    const WIDTH_THRESHOLD = 768
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`)

    widthQuery.addListener(e => this.setMobileView(e.matches))

    this.setMobileView(window.innerWidth < WIDTH_THRESHOLD)
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
    },

    setMobileView (isMobile) {
      this.mobileView = !!isMobile
    }
  }
}
</script>

<style>
.Pagination {
  @apply .flex .flex-no-wrap .justify-center;
}

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
