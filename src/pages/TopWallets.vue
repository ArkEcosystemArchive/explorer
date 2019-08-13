<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('PAGES.TOP_WALLETS.TITLE') }}</ContentHeader>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableWalletsDesktop
          :wallets="wallets"
          :total="supply"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableWalletsMobile
          :wallets="wallets"
          :total="supply"
        />
      </div>
      <Pagination
        v-if="showPagination"
        :meta="meta"
        :current-page="currentPage"
        @page-change="onPageChange"
      />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    wallets: null,
    meta: null,
    currentPage: 0
  }),

  computed: {
    ...mapGetters('network', ['supply']),

    showPagination () {
      return this.meta && this.meta.pageCount > 1
    },

    sortParams: {
      get () {
        return this.$store.getters['ui/walletSortParams']
      },

      set (params) {
        this.$store.dispatch('ui/setWalletSortParams', {
          field: params.field,
          type: params.type
        })
      }
    }
  },

  watch: {
    currentPage () {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await WalletService.top(to.params.page)

      next(vm => {
        vm.currentPage = Number(to.params.page)
        vm.setWallets(data)
        vm.setMeta(meta)
      })
    } catch (e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.wallets = null
    this.meta = null

    try {
      const { meta, data } = await WalletService.top(to.params.page)

      this.currentPage = Number(to.params.page)
      this.setWallets(data)
      this.setMeta(meta)
      next()
    } catch (e) { next({ name: '404' }) }
  },

  methods: {
    setWallets (wallets) {
      this.wallets = wallets
    },

    setMeta (meta) {
      this.meta = meta
    },

    onPageChange (page) {
      this.currentPage = page
    },

    changePage () {
      this.$router.push({
        name: 'top-wallets',
        params: {
          page: this.currentPage
        }
      })
    },

    onSortChange (params) {
      this.sortParams = params
    }
  }
}
</script>
