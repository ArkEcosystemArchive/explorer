import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const HomeComponent = () => import('@/pages/Home')
const BlockComponent = () => import('@/pages/Block')
const BlockTransactionsComponent = () => import('@/pages/Block/Transactions')
const BlocksComponent = () => import('@/pages/Blocks')
const WalletComponent = () => import('@/pages/Wallet')
const WalletVotersComponent = () => import('@/pages/Wallet/Voters')
const WalletBlocksComponent = () => import('@/pages/Wallet/Blocks')
const WalletTransactionsComponent = () => import('@/pages/Wallet/Transactions')
const TransactionComponent = () => import('@/pages/Transaction')
const TransactionsComponent = () => import('@/pages/Transactions')
// const StatisticsComponent = () => import('@/pages/Statistics')
const DelegateMonitorComponent = () => import('@/pages/DelegateMonitor')
const TopWalletsComponent = () => import('@/pages/TopWallets')
const NotFoundComponent = () => import('@/pages/404')

Vue.use(Router)

const titleSuffix = ' - ARK Explorer'

const router = new Router({
  mode: process.env.ROUTER_MODE,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
      meta: { title: route => { return 'Home' + titleSuffix } }
    },
    {
      path: '/wallets/:address',
      name: 'wallet',
      component: WalletComponent,
      meta: { title: route => { return 'Wallet ' + route.params.address + titleSuffix } }
    },
    {
      path: '/wallets/:address/voters',
      redirect: to => ({
        name: 'wallet-voters',
        params: { address: to.params.address, page: 1 }
      }),
      meta: { title: route => { return 'Voters' + titleSuffix } }
    },
    {
      path: '/wallets/:address/voters/:page(\\d+)',
      name: 'wallet-voters',
      component: WalletVotersComponent,
      meta: { title: route => { return 'Voters' + titleSuffix } }
    },
    {
      path: '/wallets/:address/blocks',
      redirect: to => ({
        name: 'wallet-blocks',
        params: { address: to.params.address, page: 1 }
      }),
      meta: { title: route => { return 'Blocks' + titleSuffix } }
    },
    {
      path: '/wallets/:address/blocks/:page(\\d+)',
      name: 'wallet-blocks',
      component: WalletBlocksComponent,
      meta: { title: route => { return 'Blocks' + titleSuffix } }
    },
    {
      path: '/wallets/:address/transactions',
      redirect: to => ({
        name: 'wallet-transactions',
        params: { address: to.params.address, type: 'all', page: 1 }
      }),
      meta: { title: route => { return 'Wallet Transactions' + titleSuffix } }
    },
    {
      path: '/wallets/:address/transactions/:type',
      redirect: to => ({
        name: 'wallet-transactions',
        params: { address: to.params.address, type: to.params.type, page: 1 }
      }),
      meta: { title: route => { return 'Wallet Transactions' + titleSuffix } }
    },
    {
      path: '/wallets/:address/transactions/:type/:page(\\d+)',
      name: 'wallet-transactions',
      component: WalletTransactionsComponent,
      meta: { title: route => { return 'Wallet Transactions' + titleSuffix } }
    },
    {
      path: '/block/:id',
      name: 'block',
      component: BlockComponent,
      meta: { title: route => { return 'Block' + titleSuffix } }
    },
    {
      path: '/block/:id/transactions',
      redirect: to => ({
        name: 'block-transactions',
        params: { id: to.params.id, page: 1 }
      }),
      meta: { title: route => { return 'Block Transactions' + titleSuffix } }
    },
    {
      path: '/block/:id/transactions/:page(\\d+)',
      name: 'block-transactions',
      component: BlockTransactionsComponent,
      meta: { title: route => { return 'Block Transactions' + titleSuffix } }
    },
    {
      path: '/blocks',
      redirect: to => ({ name: 'blocks', params: { page: 1 } }),
      meta: { title: route => { return 'Blocks' + titleSuffix } }
    },
    {
      path: '/blocks/:page(\\d+)',
      name: 'blocks',
      component: BlocksComponent,
      meta: { title: route => { return 'Blocks' + titleSuffix } }
    },
    {
      path: '/transaction/:id',
      name: 'transaction',
      component: TransactionComponent,
      meta: { title: route => { return 'Transaction' + titleSuffix } }
    },
    {
      path: '/transactions',
      redirect: to => ({ name: 'transactions', params: { page: 1 } }),
      meta: { title: route => { return 'Transactions' + titleSuffix } }
    },
    {
      path: '/transactions/:page(\\d+)',
      name: 'transactions',
      component: TransactionsComponent,
      meta: { title: route => { return 'Transactions' + titleSuffix } }
    },
    {
      path: '/delegate-monitor',
      name: 'delegate-monitor',
      component: DelegateMonitorComponent,
      meta: { title: route => { return 'Delegate Monitor' + titleSuffix } }
    },
    {
      path: '/top-wallets',
      redirect: to => ({ name: 'top-wallets', params: { page: 1 } }),
      meta: { title: route => { return 'Top Wallets' + titleSuffix } }
    },
    {
      path: '/top-wallets/:page(\\d+)',
      name: 'top-wallets',
      component: TopWalletsComponent,
      meta: { title: route => { return 'Top Wallets' + titleSuffix } }
    },
    // {
    //   path: '/statistics',
    //   name: 'statistics',
    //   component: StatisticsComponent
    // },
    {
      path: '/404',
      name: '404',
      component: NotFoundComponent,
      meta: { title: route => { return '404' + titleSuffix } }
    },
    {
      path: '*',
      redirect: { name: '404' },
      meta: { title: route => { return '404' + titleSuffix } }
    },
    // 2.0 fallback redirects...
    {
      path: '/address/:address',
      redirect: to => ({
        name: 'wallet',
        params: { address: to.params.address }
      }),
      meta: { title: route => { return 'Wallet' + titleSuffix } }
    },
    {
      path: '/tx/:id',
      redirect: to => ({
        name: 'transaction',
        params: { id: to.params.id }
      }),
      meta: { title: route => { return 'Transaction' + titleSuffix } }
    },
    {
      path: '/delegateMonitor',
      redirect: '/delegate-monitor',
      meta: { title: route => { return 'Delegate Monitor' + titleSuffix } }
    },
    {
      path: '/topAccounts',
      redirect: to => ({ name: 'top-wallets', params: { page: 1 } }),
      meta: { title: route => { return 'Top Wallets' + titleSuffix } }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to && to.params && to.params['disableScroll'] === true) {
      return null
    }

    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch('ui/setHeaderType', null)
  store.dispatch('ui/setMenuVisible', false)
  document.title = to.meta.title(to)

  next()
})

export default router
