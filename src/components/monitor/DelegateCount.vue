<template>
  <div class="hidden lg:flex items-center">
    <div class="mr-6 flex-none">
      <img class="block" src="@/assets/images/icons/group.svg" />
    </div>
    <div>
      <div class="text-grey mb-2">{{ $t("Delegates") }}</div>
      <div class="text-lg text-white semibold truncate">{{ delegateCount }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['delegateCount']
}
</script>
