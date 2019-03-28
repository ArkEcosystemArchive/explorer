<template>
  <div>
    <Loader :data="blocks">
      <div class="hidden sm:block">
        <table-blocks :blocks="blocks" />
      </div>
      <div class="sm:hidden">
        <table-blocks-mobile :blocks="blocks" />
      </div>
      <div class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
        <router-link
          :to="{ name: 'blocks', params: { page: 2 } }"
          tag="button"
          class="show-more-button"
        >
          {{ $t("Show more") }}
        </router-link>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'

export default {
  data: () => ({
    blocks: null
  }),

  async mounted () {
    await this.prepareComponent()
  },

  methods: {
    async prepareComponent () {
      await this.getBlocks()

      this.$store.watch(state => state.network.height, value => this.getBlocks())
    },

    async getBlocks () {
      const response = await BlockService.latest()
      this.blocks = response
    }
  }
}
</script>
