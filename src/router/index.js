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

const router = new Router({
  mode: process.env.ROUTER_MODE,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/wallets/:address',
      name: 'wallet',
      component: WalletComponent
    },
    {
      path: '/wallets/:address/voters',
      redirect: to => ({
        name: 'wallet-voters',
        params: { address: to.params.address, page: 1 }
      })
    },
    {
      path: '/wallets/:address/voters/:page(\\d+)',
      name: 'wallet-voters',
      component: WalletVotersComponent
    },
    {
      path: '/wallets/:address/blocks',
      redirect: to => ({
        name: 'wallet-blocks',
        params: { address: to.params.address, page: 1 }
      })
    },
    {
      path: '/wallets/:address/blocks/:page(\\d+)',
      name: 'wallet-blocks',
      component: WalletBlocksComponent
    },
    {
      path: '/wallets/:address/transactions',
      redirect: to => ({
        name: 'wallet-transactions',
        params: { address: to.params.address, type: 'all', page: 1 }
      })
    },
    {
      path: '/wallets/:address/transactions/:type',
      redirect: to => ({
        name: 'wallet-transactions',
        params: { address: to.params.address, type: to.params.type, page: 1 }
      })
    },
    {
      path: '/wallets/:address/transactions/:type/:page(\\d+)',
      name: 'wallet-transactions',
      component: WalletTransactionsComponent
    },
    {
      path: '/block/:id',
      name: 'block',
      component: BlockComponent
    },
    {
      path: '/block/:id/transactions',
      redirect: to => ({
        name: 'block-transactions',
        params: { id: to.params.id, page: 1 }
      })
    },
    {
      path: '/block/:id/transactions/:page(\\d+)',
      name: 'block-transactions',
      component: BlockTransactionsComponent
    },
    {
      path: '/blocks',
      redirect: to => ({ name: 'blocks', params: { page: 1 } })
    },
    {
      path: '/blocks/:page(\\d+)',
      name: 'blocks',
      component: BlocksComponent
    },
    {
      path: '/transaction/:id',
      name: 'transaction',
      component: TransactionComponent
    },
    {
      path: '/transactions',
      redirect: to => ({ name: 'transactions', params: { page: 1 } })
    },
    {
      path: '/transactions/:page(\\d+)',
      name: 'transactions',
      component: TransactionsComponent
    },
    {
      path: '/delegate-monitor',
      name: 'delegate-monitor',
      component: DelegateMonitorComponent
    },
    {
      path: 'top-wallets',
      redirect: to => ({ name: 'top-wallets', params: { page: 1 } })
    },
    {
      path: '/top-wallets/:page(\\d+)',
      name: 'top-wallets',
      component: TopWalletsComponent
    },
    // {
    //   path: '/statistics',
    //   name: 'statistics',
    //   component: StatisticsComponent
    // },
    {
      path: '404',
      name: '404',
      component: NotFoundComponent
    },
    {
      path: '*',
      redirect: { name: '404' }
    },
    // 2.0 fallback redirects...
    {
      path: '/address/:address',
      redirect: to => ({
        name: 'wallet',
        params: { address: to.params.address }
      })
    }, {
      path: '/tx/:id',
      redirect: to => ({
        name: 'transaction',
        params: { id: to.params.id }
      })
    }, {
      path: '/delegateMonitor',
      redirect: '/delegate-monitor'
    }, {
      path: '/topAccounts',
      redirect: to => ({ name: 'top-wallets', params: { page: 1 } })
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

  next()
})

export default router
