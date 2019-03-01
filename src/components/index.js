import Vue from 'vue'

// https://github.com/vuejs/vue-loader/releases/tag/v13.0.0

// Utilities
Vue.component('clipboard', require('@/components/utils/Clipboard').default)
Vue.component('currency', require('@/components/utils/Currency').default)
Vue.component('paginator', require('@/components/utils/Paginator').default)
Vue.component('qr-code', require('@/components/utils/QrCode').default)
Vue.component('transaction-amount', require('@/components/utils/TransactionAmount').default)

// Links
Vue.component('link-block', require('@/components/links/Block').default)
Vue.component('link-transaction', require('@/components/links/Transaction').default)
Vue.component('link-wallet', require('@/components/links/Wallet').default)

// Tables
Vue.component('table-blocks', require('@/components/tables/Blocks').default)
Vue.component('table-blocks-mobile', require('@/components/tables/mobile/Blocks').default)
Vue.component('table-transactions', require('@/components/tables/Transactions').default)
Vue.component('table-transactions-detail', require('@/components/tables/TransactionsDetail').default)
Vue.component('table-transactions-detail-mobile', require('@/components/tables/mobile/TransactionsDetail').default)
Vue.component('table-transactions-mobile', require('@/components/tables/mobile/Transactions').default)
Vue.component('table-wallets', require('@/components/tables/Wallets').default)
Vue.component('table-wallets-mobile', require('@/components/tables/mobile/Wallets').default)

// Misc.
Vue.component('ark-meter', require('@/components/ArkMeter').default)
Vue.component('content-header', require('@/components/ContentHeader').default)
Vue.component('modal', require('@/components/Modal').default)

// Loading
Vue.component('loader', require('@/components/utils/Loader').default)
