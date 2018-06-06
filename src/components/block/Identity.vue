<template>
  <section class="mb-5 bg-theme-feature-background xl:rounded-lg flex flex-col md:flex-row items-center px-5 sm:px-10 py-8">
    <div class="flex items-center flex-auto w-full md:w-auto mb-5 md:mb-0">
      <img class="mr-6" src="@/assets/images/icons/block.svg" />
      <div class="flex-auto min-w-0">
        <div class="text-grey mb-2">{{ $t("Block ID") }}</div>
        <div class="flex">
          <div class="text-xl text-white semibold truncate">
            <span class="mr-2">{{ block.id ? block.id : "&nbsp;" }}</span>
          </div>
          <clipboard
            v-if="block.id"
            :value="block.id"></clipboard>
        </div>
      </div>
    </div>
    <div class="flex w-full md:block md:w-auto justify-between">
      <button @click="prevHandler" :disabled="block.height == 1" class="block-pager-button mr-5">
        <svg
         class="inline"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         width="5px" height="8px">
        <path fill-rule="evenodd" fill="currentColor"
         d="M4.054,8.000 L5.000,7.067 L1.892,4.000 L5.000,0.933 L4.054,0.000 L-0.000,4.000 L4.054,8.000 Z"/>
        </svg>
        <span class="ml-2 hidden md:block inline-button">{{ $t("Previous block") }}</span>
        <span class="ml-2 md:hidden">{{ $t("Previous") }}</span>
      </button>
      <button @click="nextHandler" :disabled="block.confirmations == 1" class="block-pager-button">
        <span class="mr-2 hidden md:block inline-button">{{ $t("Next block") }}</span>
        <span class="mr-2 md:hidden">{{ $t("Next") }}</span>
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
  </section>
</template>

<script type="text/ecmascript-6">
export default {
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
}
</script>

<style>
@media (min-width: 768px) {
  .inline-button {
    display: inline-block;
  }
}
</style>