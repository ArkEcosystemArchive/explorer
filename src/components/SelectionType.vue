<template>
  <span
    class="flex relative z-20"
  >
    <span
      class="flex items-center cursor-pointer"
      :class="color"
      v-click-outside="closeDropdown"
      @click="selectOpen = !selectOpen"
    >
      <span class="mr-1 md:whitespace-no-wrap">{{ $t(types[transactionType + 1]) }}</span>
      <svg :class="{ 'rotate-180': isOpen }" class="fill-current" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="16px" height="16px">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </span>

    <ul v-show="isOpen" class="absolute pin-x sm:pin-none sm:pin-r mt-6 bg-white shadow rounded border overflow-hidden list-reset text-sm">
      <li v-for="(type, index) in types">
        <div @click="filterTransactions(index - 1)" class="dropdown-button">{{ $t(type) }}</div>
      </li>
    </ul>
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'text-theme-text-primary'
    }
  },

  data: () => ({
    types: [
      'All', 'Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'Multisignature Registration'
    ],
    transactionType: -1,
    selectOpen: false,
  }),

  created() {
    this.transactionType = Number(localStorage.getItem('transactionType') || -1)
  },

  computed: {
    isOpen() {
      return this.selectOpen
    }
  },

  methods: {
    filterTransactions(type) {
      this.closeDropdown()
      this.setTransactionType(type)
      this.$emit('change', type)
    },

    setTransactionType(type) {
      localStorage.setItem('transactionType', type)
      this.transactionType = type
    },

    closeDropdown() {
      this.selectOpen = false
    }
  }
}
</script>
