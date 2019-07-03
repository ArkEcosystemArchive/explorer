<template>
  <div class="px-5 sm:px-10 pt-8 flex flex-wrap flex-col">
    {{ this.$options.model }}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BlockSearchForm',

  model: 'Block'
}
</script>
