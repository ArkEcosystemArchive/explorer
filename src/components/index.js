import Vue from 'vue'

// https://github.com/vuejs/vue-loader/releases/tag/v13.0.0

// Utilities
Vue.component('clipboard', require('@/components/utils/Clipboard.vue').default)
Vue.component('currency', require('@/components/utils/Currency.vue').default)
Vue.component('paginator', require('@/components/utils/Paginator.vue').default)
Vue.component('qr-code', require('@/components/utils/QrCode').default)
Vue.component('transaction-amount', require('@/components/utils/TransactionAmount').default)

// Links
Vue.component('link-block', require('@/components/links/Block.vue').default)
Vue.component('link-transaction', require('@/components/links/Transaction.vue').default)
Vue.component('link-wallet', require('@/components/links/Wallet.vue').default)

// Tables
Vue.component('table-blocks', require('@/components/tables/Blocks.vue').default)
Vue.component('table-blocks-mobile', require('@/components/tables/mobile/Blocks.vue').default)
Vue.component('table-transactions', require('@/components/tables/Transactions.vue').default)
Vue.component('table-transactions-detail', require('@/components/tables/TransactionsDetail.vue').default)
Vue.component('table-transactions-detail-mobile', require('@/components/tables/mobile/TransactionsDetail.vue').default)
Vue.component('table-transactions-mobile', require('@/components/tables/mobile/Transactions.vue').default)
Vue.component('table-wallets', require('@/components/tables/Wallets.vue').default)
Vue.component('table-wallets-mobile', require('@/components/tables/mobile/Wallets.vue').default)

// Misc.
Vue.component('ark-meter', require('@/components/ArkMeter.vue').default)
Vue.component('content-header', require('@/components/ContentHeader.vue').default)
Vue.component('modal', require('@/components/Modal.vue').default)

// Loading
Vue.component('loader', require('@/components/utils/Loader.vue').default)
