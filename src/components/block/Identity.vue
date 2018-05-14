<template>
  <section class="mb-5 bg-theme-feature-background xl:rounded-lg flex flex-col md:flex-row items-center px-10 py-8">
    <div class="flex items-center flex-auto w-full md:w-auto mb-5 md:mb-0">
      <img class="mr-6" src="@/assets/images/icons/block.svg" />
      <div>
        <div class="text-grey mb-2">{{ $t("Block ID") }}</div>
        <div class="text-xl text-white semibold">{{ block.id ? block.id : "&nbsp;" }}</div>
      </div>
    </div>
    <div class="flex w-full md:block md:w-auto justify-between">
      <button @click="prevHandler" class="block-pager-button mr-5">
        <img src="@/assets/images/icons/caret-left.svg" />
        <span class="ml-2 hidden md:block inline-button">{{ $t("Previous block") }}</span>
        <span class="ml-2 md:hidden">{{ $t("Previous") }}</span>
      </button>
      <button @click="nextHandler" class="block-pager-button">
        <span class="mr-2 hidden md:block inline-button">{{ $t("Next block") }}</span>
        <span class="mr-2 md:hidden">{{ $t("Next") }}</span>
        <img src="@/assets/images/icons/caret-right.svg" />
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