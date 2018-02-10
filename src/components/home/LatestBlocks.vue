<template>
  <div>
    <div class="hidden sm:block">
      <table-blocks :blocks="blocks"></table-blocks>
    </div>
    <div class="sm:hidden">
      <table-blocks-mobile :blocks="blocks"></table-blocks-mobile>
    </div>
    <div class="mx-10 mt-10 flex flex-wrap">
      <router-link :to="{ name: 'blocks', params: { page: 1 } }" tag="button" class="show-more-button">
        Show more
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'

export default {
  data: () => ({ blocks: [] }),

  mounted() {
    BlockService.latest().then(response => (this.blocks = response))
  },
}
</script>
