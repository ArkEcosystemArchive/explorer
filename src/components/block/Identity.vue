<template>
  <section class="mb-5 bg-theme-feature-background xl:rounded-lg flex flex-col md:flex-row items-center px-5 sm:px-10 py-8">
    <div class="flex items-center flex-auto w-full md:w-auto mb-5 md:mb-0 truncate md:mr-10">
      <img
        class="mr-6"
        src="@/assets/images/icons/block.svg"
      >
      <div class="flex-auto min-w-0">
        <div class="text-grey mb-2">
          {{ $t('BLOCK.ID') }}
        </div>
        <div class="flex">
          <div class="text-xl text-white semibold truncate">
            <span
              v-tooltip="block.id"
              class="mr-2"
            >
              {{ block.id }}
            </span>
          </div>
          <Clipboard
            v-if="block.id"
            :value="block.id"
          />
        </div>
      </div>
    </div>
    <div class="flex w-full md:block md:w-auto justify-between whitespace-no-wrap">
      <button
        :disabled="isFirstBlock"
        class="block-pager-button mr-5"
        @click="prevHandler"
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
        <span class="ml-2 hidden md:block inline-button">{{ $t('BLOCK.PAGINATION.PREVIOUS') }}</span>
        <span class="ml-2 md:hidden">{{ $t('PAGINATION.PREVIOUS') }}</span>
      </button>
      <button
        :disabled="isLastBlock"
        class="block-pager-button"
        @click="nextHandler"
      >
        <span class="mr-2 hidden md:block inline-button">{{ $t('BLOCK.PAGINATION.NEXT') }}</span>
        <span class="mr-2 md:hidden">{{ $t('PAGINATION.NEXT') }}</span>
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
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'BlockIdentity',

  props: {
    block: {
      type: Object,
      required: true
    },

    prevHandler: {
      type: Function,
      required: true
    },

    nextHandler: {
      type: Function,
      required: true
    }
  },

  computed: {
    ...mapGetters('network', ['height']),

    isFirstBlock () {
      return this.block.height === 1
    },

    isLastBlock () {
      return this.block.height === this.height
    }
  }
}
</script>

<style>
@media (min-width: 768px) {
  .inline-button {
    display: inline-block;
  }
}
</style>
