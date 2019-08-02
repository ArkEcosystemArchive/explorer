<template>
  <div
    v-show="isVisible"
    class="Pagination__Input"
  >
    <input
      id="page"
      v-model.trim="page"
      v-tooltip="{
        show: hasError,
        content: $t('Nothing matched your search'),
        trigger: 'manual',
        placement: 'bottom-start',
        classes: 'search-tip'
      }"
      :placeholder="placeholder"
      :class="{ 'text-grey': nightMode }"
      class="search-input"
      @keyup.enter="search"
    >

    <button
      class="close-button text-theme-button-close"
      @click="emitClose"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="12px"
        height="12px"
        viewBox="0 0 14 14"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M13.723,2.657 L8.885,7.484 L13.716,12.304 C14.098,12.685 14.098,13.304 13.716,13.685 C13.334,14.066 12.714,14.066 12.332,13.685 L7.501,8.865 L2.649,13.706 C2.266,14.087 1.647,14.087 1.264,13.706 C0.882,13.324 0.882,12.706 1.264,12.325 L6.116,7.484 L1.264,2.643 C0.882,2.262 0.882,1.644 1.264,1.262 C1.647,0.881 2.266,0.881 2.649,1.262 L7.501,6.103 L12.338,1.276 C12.721,0.895 13.341,0.895 13.723,1.276 C14.105,1.658 14.105,2.276 13.723,2.657 Z"
        />
      </svg>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'PaginationPageInput',

  props: {
    isVisible: {
      type: Boolean,
      required: true
    },

    pageCount: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    page: null,
    placeholder: null,
    hasError: false
  }),

  computed: {
    ...mapGetters('ui', ['nightMode'])
  },

  mounted () {
    const WIDTH_THRESHOLD = 768
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`)

    widthQuery.addListener(e => this.setMobilePlaceholder(e.matches))

    this.setMobilePlaceholder(window.innerWidth < WIDTH_THRESHOLD)
  },

  methods: {
    search () {
      if (!this.page) {
        return
      }

      const pageNumber = parseInt(this.page, 10)

      if (!pageNumber || pageNumber > this.pageCount) {
        this.hasError = true
        setTimeout(() => (this.hasError = false), 1500)
      } else {
        this.emitPageChange(pageNumber)
      }
    },

    setMobilePlaceholder (showMobile) {
      this.placeholder = showMobile
        ? this.$i18n.t('Page #')
        : this.$i18n.t('Enter the page number')
    },

    emitPageChange (page) {
      this.$emit('page-change', page)
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

.close-button {
  @apply .flex .flex-none .p-2;
}

.close-button img {
  width: 12px;
  height: 12px;
}

.search-input {
  @apply .w-full .flex-auto .bg-transparent .p-2;
}

.search-input::placeholder {
  color: var(--color-theme-text-placeholder);
}
</style>
