<template>
  <span
    v-click-outside="closeDropdown"
    class="flex w-full sm:w-auto relative z-20 sm:mr-10"
    :class="{ 'sm:mb-4': !inBanner }"
  >
    <div class="flex sm:hidden w-full">
      <span
        class="flex items-center rounded-l py-4 px-6 text-xs"
        :class="`bg-${backgroundColor} text-${secondaryTextColor}`"
      >
        {{ $t("Type") }}
      </span>

      <span
        class="flex flex-1 items-center justify-between border rounded-r cursor-pointer p-4"
        :class="`border-${backgroundColor} text-${primaryTextColor}`"
        @click="toggleDropdown"
      >
        <span class="font-bold">
          {{ $t(types[transactionType + 1]) }}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="fill-current"
          :class="{ 'rotate-180': isOpen }"
          viewBox="0 0 20 20"
          width="16px"
          height="16px"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </span>

      <ul
        v-show="isOpen"
        class="absolute pin-x mt-10 bg-white shadow rounded border overflow-hidden list-reset text-sm"
      >
        <li
          v-for="(type, index) in types"
          :key="type"
        >
          <div
            class="dropdown-button"
            @click="filterTransactions(index - 1)"
          >{{ $t(type) }}</div>
        </li>
      </ul>
    </div>

    <div class="hidden sm:block">
      <span
        class="block mb-2 text-xs"
        :class="[ inBanner ? bannerClasses : 'text-theme-text-thead' ]"
      >
        {{ $t("Type") }}
      </span>

      <span
        class="flex items-center cursor-pointer"
        :class="`border-${backgroundColor} text-${primaryTextColor}`"
        @click="toggleDropdown"
      >
        <span class="mr-1 md:whitespace-no-wrap">{{ $t(types[transactionType + 1]) }}</span>
        <svg
          :class="{ 'rotate-180': isOpen }"
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="16px"
          height="16px"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </span>

      <ul
        v-show="isOpen"
        class="absolute pin-r mt-2 bg-white shadow rounded border overflow-hidden list-reset text-sm"
      >
        <li
          v-for="(type, index) in types"
          :key="type"
        >
          <div
            class="dropdown-button"
            @click="filterTransactions(index - 1)"
          >{{ $t(type) }}</div>
        </li>
      </ul>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    inBanner: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: () => ({
    types: [
      'All', 'Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'Multisignature Registration'
    ],
    transactionType: -1,
    selectOpen: false
  }),

  computed: {
    isOpen () {
      return this.selectOpen
    },

    backgroundColor () {
      return this.inBanner ? 'none' : 'theme-page-background'
    },

    primaryTextColor () {
      return this.inBanner ? 'white' : 'theme-text-primary'
    },

    secondaryTextColor () {
      return this.inBanner ? 'grey' : 'theme-text-secondary'
    },

    bannerClasses () {
      return `bg-${this.backgroundColor} text-${this.secondaryTextColor}`
    }
  },

  created () {
    this.transactionType = Number(localStorage.getItem('transactionType') || -1)
  },

  methods: {
    filterTransactions (type) {
      this.closeDropdown()
      this.setTransactionType(type)
      this.$emit('change', type)
    },

    setTransactionType (type) {
      localStorage.setItem('transactionType', type)
      this.transactionType = type
    },

    closeDropdown () {
      this.selectOpen = false
    },

    toggleDropdown () {
      this.selectOpen = !this.selectOpen
    }
  }
}
</script>
