<template>
  <span>
    <div class="text-center">
      <pulse-loader :loading="!data.length" color="#037cff"></pulse-loader>
    </div>

    <slot v-if="data.length" />
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    data: {
      required: true
    }
  }
}
</script>
