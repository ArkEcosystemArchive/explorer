import Vue from 'vue'
import Router from 'vue-router'
import { Route, RouterMode } from 'vue-router';
import { Position, PositionResult } from 'vue-router/types/router';
//@ts-ignore
import store from '@/store'
import NProgress from 'nprogress'

//@ts-ignore
const HomeComponent = () => import('@/pages/Home')
//@ts-ignore
const BlockComponent = () => import('@/pages/Block')
//@ts-ignore
const BlockTransactionsComponent = () => import('@/pages/Block/Transactions')
//@ts-ignore
const BlocksComponent = () => import('@/pages/Blocks')
//@ts-ignore
const WalletComponent = () => import('@/pages/Wallet')
//@ts-ignore
const WalletVotersComponent = () => import('@/pages/Wallet/Voters')
//@ts-ignore
const WalletBlocksComponent = () => import('@/pages/Wallet/Blocks')
//@ts-ignore
const WalletTransactionsComponent = () => import('@/pages/Wallet/Transactions')
//@ts-ignore
const TransactionComponent = () => import('@/pages/Transaction')
//@ts-ignore
const TransactionsComponent = () => import('@/pages/Transactions')
//@ts-ignore
const DelegateMonitorComponent = () => import('@/pages/DelegateMonitor')
//@ts-ignore
const TopWalletsComponent = () => import('@/pages/TopWallets')
//@ts-ignore
const NotFoundComponent = () => import('@/pages/404')

Vue.use(Router)

function getTitle (title: string): string {
  return `${title} - ${process.env.VUE_APP_TITLE}`
}

const router = new Router({
  mode: <RouterMode>process.env.VUE_APP_ROUTER_MODE,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
      meta: { title: (route: Route) => { return getTitle('Home') } }
    },
    {
      path: '/wallets/:address',
      name: 'wallet',
      component: WalletComponent,
      meta: { title: (route: Route) => { return getTitle('Wallet ' + route.params.address) } }
    },
    {
      path: '/wallets/:address/voters',
      redirect: to => ({
        name: 'wallet-voters',
        params: { address: to.params.address, page: 1 }
      }),
      meta: { title: (route: Route) => { return getTitle('Voters') } }
    },
    {
      path: '/wallets/:address/voters/:page(\\d+)',
      name: 'wallet-voters',
      component: WalletVotersComponent,
      meta: { title: (route: Route) => { return getTitle('Voters') } }
    },
    {
      path: '/wallets/:address/blocks',
      redirect: to => ({
        name: 'wallet-blocks',
        params: { address: to.params.address, page: 1 }
      }),
      meta: { title: (route: Route) => { return getTitle('Wallet Blocks') } }
    },
    {
      path: '/wallets/:address/blocks/:page(\\d+)',
      name: 'wallet-blocks',
      component: WalletBlocksComponent,
      meta: { title: (route: Route) => { return getTitle('Wallet Blocks') } }
    },
    {
      path: '/wallets/:address/transactions',
      redirect: to => ({
        name: 'wallet-transactions',
        params: { address: to.params.address, type: 'all', page: 1 }
      }),
      meta: { title: (route: Route) => { return getTitle('Wallet Transactions') } }
    },
    {
      path: '/wallets/:address/transactions/:type',
      redirect: to => ({
        name: 'wallet-transactions',
        params: { address: to.params.address, type: to.params.type, page: 1 }
      }),
      meta: { title: (route: Route) => { return getTitle('Wallet Transactions') } }
    },
    {
      path: '/wallets/:address/transactions/:type/:page(\\d+)',
      name: 'wallet-transactions',
      component: WalletTransactionsComponent,
      meta: { title: (route: Route) => { return getTitle('Wallet Transactions') } }
    },
    {
      path: '/block/:id',
      name: 'block',
      component: BlockComponent,
      meta: { title: (route: Route) => { return getTitle('Block') } }
    },
    {
      path: '/block/:id/transactions',
      redirect: to => ({
        name: 'block-transactions',
        params: { id: to.params.id, page: 1 }
      }),
      meta: { title: (route: Route) => { return getTitle('Block Transactions') } }
    },
    {
      path: '/block/:id/transactions/:page(\\d+)',
      name: 'block-transactions',
      component: BlockTransactionsComponent,
      meta: { title: (route: Route) => { return getTitle('Block Transactions') } }
    },
    {
      path: '/blocks',
      redirect: to => ({ name: 'blocks', params: { page: 1 } }),
      meta: { title: (route: Route) => { return getTitle('Blocks') } }
    },
    {
      path: '/blocks/:page(\\d+)',
      name: 'blocks',
      component: BlocksComponent,
      meta: { title: (route: Route) => { return getTitle('Blocks') } }
    },
    {
      path: '/transaction/:id',
      name: 'transaction',
      component: TransactionComponent,
      meta: { title: (route: Route) => { return getTitle('Transaction') } }
    },
    {
      path: '/transactions',
      redirect: to => ({ name: 'transactions', params: { page: 1 } }),
      meta: { title: (route: Route) => { return getTitle('Transactions') } }
    },
    {
      path: '/transactions/:page(\\d+)',
      name: 'transactions',
      component: TransactionsComponent,
      meta: { title: (route: Route) => { return getTitle('Transactions') } }
    },
    {
      path: '/delegate-monitor',
      name: 'delegate-monitor',
      component: DelegateMonitorComponent,
      meta: { title: (route: Route) => { return getTitle('Delegate Monitor') } }
    },
    {
      path: '/top-wallets',
      redirect: to => ({ name: 'top-wallets', params: { page: 1 } }),
      meta: { title: (route: Route) => { return getTitle('Top Wallets') } }
    },
    {
      path: '/top-wallets/:page(\\d+)',
      name: 'top-wallets',
      component: TopWalletsComponent,
      meta: { title: (route: Route) => { return getTitle('Top Wallets') } }
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundComponent,
      meta: { title: (route: Route) => { return getTitle('404') } }
    },
    {
      path: '*',
      redirect: { name: '404' },
      meta: { title: (route: Route) => { return getTitle('404') } }
    },
    // 2.0 fallback redirects...
    {
      path: '/address/:address',
      redirect: to => ({
        name: 'wallet',
        params: { address: to.params.address }
      }),
      meta: { title: (route: Route) => { return getTitle('Wallet') } }
    },
    {
      path: '/tx/:id',
      redirect: to => ({
        name: 'transaction',
        params: { id: to.params.id }
      }),
      meta: { title: (route: Route) => { return getTitle('Transaction') } }
    },
    {
      path: '/delegateMonitor',
      redirect: '/delegate-monitor',
      meta: { title: (route: Route) => { return getTitle('Delegate Monitor') } }
    },
    {
      path: '/topAccounts',
      redirect: to => ({ name: 'top-wallets', params: { page: 1 } }),
      meta: { title: (route: Route) => { return getTitle('Top Wallets') } }
    }
  ],
  scrollBehavior (to: Route, from: Route, savedPosition: void | Position): PositionResult | Promise<PositionResult> | void {
    if (to && to.params && Boolean(to.params['disableScroll']) === true) {
      return
    }

    return { x: 0, y: 0 }
  }
})

router.beforeEach((to: Route, from: Route, next: Function) => {
  NProgress.start()
  store.dispatch('ui/setHeaderType', null)
  store.dispatch('ui/setMenuVisible', false)
  document.title = to.meta.title(to)

  next()
})

router.afterEach(() => {
  NProgress.done(true)
})

export default router
