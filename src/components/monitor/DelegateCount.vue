<template>
  <div class="hidden lg:flex items-center">
    <div class="mr-6 flex-none">
      <img class="block" src="@/assets/images/icons/group.svg" />
    </div>
    <div>
      <div class="text-grey mb-2">{{ $t("Delegates") }}</div>
      <div class="text-lg text-white semibold truncate">{{ count }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DelegateService from '@/services/delegate'

export default {
  data: () => ({
    count: 0,
    timer: null
  }),

  mounted() {
    this
      .getCount()
      .then(() => this.initialiseTimer())
  },

  methods: {
    getCount() {
      return DelegateService
        .activeDelegatesCount()
        .then(response => this.count = response)
    },

    initialiseTimer() {
      this.timer = setInterval(this.getCount, 8 * 1000)
    }
  },

  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
