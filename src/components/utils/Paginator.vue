<template>
  <div class="flex flex-wrap mx-5 sm:mx-10 mt-5 md:mt-10">
    <button
      :class="previous ? 'flex' : 'hidden'"
      class="mr-auto pager-button items-center"
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
      <span class="ml-2">{{ $t('PAGINATION.PREVIOUS') }}</span>
    </button>

    <button
      :class="next ? 'flex' : 'hidden'"
      class="ml-auto pager-button items-center float-right"
      @click="emitNext"
    >
      <span class="mr-2">{{ $t('PAGINATION.NEXT') }}</span>
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
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Paginator',

  props: {
    previous: {
      type: null,
      required: true
    },
    next: {
      type: null,
      required: true
    }
  },

  computed: {
  },

  methods: {
    emitPrevious () {
      this.$emit('previous')
    },

    emitNext () {
      this.$emit('next')
    }
  }
}
</script>
