<template>
  <section class="mb-5 bg-theme-feature-background xl:rounded-lg flex items-center px-10 py-8">
    <img class="mr-6" src="@/assets/images/icons/block.svg" />
    <div class="flex-auto">
      <div class="text-grey mb-2">{{ $t("Block ID") }}</div>
      <div class="text-xl text-white semibold">{{ block.id }}</div>
    </div>
    <div class="hidden sm:block">
      <button @click="prevHandler" class="hover-button mr-5 py-4 px-5 bg-transparent bg-blue-darker rounded-md text-white font-normal text-xs">
        <img src="@/assets/images/icons/caret-left.svg" />
        <span class="ml-2 hidden">{{ $t("Previous block") }}</span>
      </button>
      <button @click="nextHandler" class="hover-button py-4 px-5 bg-transparent bg-blue-darker rounded-md text-white font-normal text-xs">
        <span class="mr-2 hidden">{{ $t("Next block") }}</span>
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
.hover-button:hover span {
  display: inline-block;
}
</style>
