<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('WALLET.DELEGATE.VOTERS') }} <span v-if="delegate">- {{ delegate.username }}</span></ContentHeader>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableWalletsDesktop
          :wallets="wallets"
          :total="delegate ? delegate.votes : 0"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableWalletsMobile
          :wallets="wallets"
          :total="delegate ? delegate.votes : 0"
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
import DelegateService from '@/services/delegate'

export default {
  data: () => ({
    delegate: null,
    wallets: null,
    meta: null,
    currentPage: 0
  }),

  computed: {
    showPagination () {
      return this.meta && this.meta.pageCount > 1
    },

    address () {
      return this.$route.params.address
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
      const delegate = await DelegateService.find(to.params.address)
      const { meta, data } = await DelegateService.voters(to.params.address, to.params.page)

      next(vm => {
        vm.currentPage = Number(to.params.page)
        vm.setDelegate(delegate)
        vm.setWallets(data)
        vm.setMeta(meta)
      })
    } catch (e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.wallets = null
    this.meta = null

    try {
      const delegate = await DelegateService.find(to.params.address)
      const { meta, data } = await DelegateService.voters(to.params.address, to.params.page)

      this.currentPage = Number(to.params.page)
      this.setDelegate(delegate)
      this.setWallets(data)
      this.setMeta(meta)
      next()
    } catch (e) { next({ name: '404' }) }
  },

  methods: {
    setDelegate (delegate) {
      this.delegate = delegate
    },

    setWallets (wallets) {
      this.wallets = wallets
    },

    setMeta (meta) {
      this.meta = meta
    },

    onPageChange (page) {
      this.currentPage = page
    },

    changePage (page) {
      this.$router.push({
        name: 'wallet-voters',
        params: {
          address: this.address,
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
