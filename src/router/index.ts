import Vue from "vue";
import Router from "vue-router";
import { Route, RouterMode } from "vue-router";
import { Position, PositionResult } from "vue-router/types/router";
import store from "@/store";
import NProgress from "nprogress";

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const HomeComponent = () => import(/* webpackChunkName: "home" */ "@/pages/Home.vue");
const BlockComponent = () => import(/* webpackChunkName: "block" */ "@/pages/Block.vue");
const BlockTransactionsComponent = () =>
  import(/* webpackChunkName: "transactions" */ "@/pages/Block/Transactions.vue");
const BlocksComponent = () => import(/* webpackChunkName: "blocks" */ "@/pages/Blocks.vue");
const WalletComponent = () => import(/* webpackChunkName: "wallet" */ "@/pages/Wallet.vue");
const WalletVotersComponent = () => import(/* webpackChunkName: "voters" */ "@/pages/Wallet/Voters.vue");
const WalletBlocksComponent = () => import(/* webpackChunkName: "blocks" */ "@/pages/Wallet/Blocks.vue");
const WalletTransactionsComponent = () =>
  import(/* webpackChunkName: "transactions" */ "@/pages/Wallet/Transactions.vue");
const TransactionComponent = () => import(/* webpackChunkName: "transaction" */ "@/pages/Transaction.vue");
const TransactionsComponent = () => import(/* webpackChunkName: "transactions" */ "@/pages/Transactions.vue");
const DelegateMonitorComponent = () => import(/* webpackChunkName: "delegate-monitor" */ "@/pages/DelegateMonitor.vue");
const TopWalletsComponent = () => import(/* webpackChunkName: "top-wallets" */ "@/pages/TopWallets.vue");
const AdvancedSearchComponent = () => import(/* webpackChunkName: "search" */ "@/pages/AdvancedSearch.vue");
const DelegateComponent = () => import(/* webpackChunkName: "delegates" */ "@/pages/Delegates.vue");
const NotFoundComponent = () => import(/* webpackChunkName: "404" */ "@/pages/404.vue");

Vue.use(Router);

function getTitle(title: string): string {
  return `${title} - ${process.env.VUE_APP_TITLE}`;
}

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE as RouterMode,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeComponent,
      meta: { title: (route: Route) => getTitle("Home") },
    },
    {
      path: "/wallets/:address",
      name: "wallet",
      component: WalletComponent,
      meta: { title: (route: Route) => getTitle("Wallet " + route.params.address) },
    },
    {
      path: "/wallets/:address/voters",
      redirect: (to) => ({
        name: "wallet-voters",
        params: { address: to.params.address, page: 1 },
      }),
      meta: { title: (route: Route) => getTitle("Voters") },
    },
    {
      path: "/wallets/:address/voters/:page(\\d+)",
      name: "wallet-voters",
      component: WalletVotersComponent,
      meta: { title: (route: Route) => getTitle("Voters") },
    },
    {
      path: "/wallets/:address/blocks",
      redirect: (to) => ({
        name: "wallet-blocks",
        params: { address: to.params.address, page: 1 },
      }),
      meta: { title: (route: Route) => getTitle("Wallet Blocks") },
    },
    {
      path: "/wallets/:address/blocks/:page(\\d+)",
      name: "wallet-blocks",
      component: WalletBlocksComponent,
      meta: { title: (route: Route) => getTitle("Wallet Blocks") },
    },
    {
      path: "/wallets/:address/transactions",
      redirect: (to) => ({
        name: "wallet-transactions",
        params: { address: to.params.address, type: "all", page: 1 },
      }),
      meta: { title: (route: Route) => getTitle("Wallet Transactions") },
    },
    {
      path: "/wallets/:address/transactions/:type",
      redirect: (to) => ({
        name: "wallet-transactions",
        params: { address: to.params.address, type: to.params.type, page: 1 },
      }),
      meta: { title: (route: Route) => getTitle("Wallet Transactions") },
    },
    {
      path: "/wallets/:address/transactions/:type/:page(\\d+)",
      name: "wallet-transactions",
      component: WalletTransactionsComponent,
      meta: { title: (route: Route) => getTitle("Wallet Transactions") },
    },
    {
      path: "/block/:id",
      name: "block",
      component: BlockComponent,
      meta: { title: (route: Route) => getTitle("Block") },
    },
    {
      path: "/block/:id/transactions",
      redirect: (to) => ({
        name: "block-transactions",
        params: { id: to.params.id, page: 1 },
      }),
      meta: { title: (route: Route) => getTitle("Block Transactions") },
    },
    {
      path: "/block/:id/transactions/:page(\\d+)",
      name: "block-transactions",
      component: BlockTransactionsComponent,
      meta: { title: (route: Route) => getTitle("Block Transactions") },
    },
    {
      path: "/blocks",
      redirect: (to) => ({ name: "blocks", params: { page: 1 } }),
      meta: { title: (route: Route) => getTitle("Blocks") },
    },
    {
      path: "/blocks/:page(\\d+)",
      name: "blocks",
      component: BlocksComponent,
      meta: { title: (route: Route) => getTitle("Blocks") },
    },
    {
      path: "/transaction/:id",
      name: "transaction",
      component: TransactionComponent,
      meta: { title: (route: Route) => getTitle("Transaction") },
    },
    {
      path: "/transactions",
      redirect: (to) => ({ name: "transactions", params: { page: 1 } }),
      meta: { title: (route: Route) => getTitle("Transactions") },
    },
    {
      path: "/transactions/:page(\\d+)",
      name: "transactions",
      component: TransactionsComponent,
      meta: { title: (route: Route) => getTitle("Transactions") },
    },
    {
      path: "/delegate-monitor",
      name: "delegate-monitor",
      component: DelegateMonitorComponent,
      meta: { title: (route: Route) => getTitle("Delegate Monitor") },
    },
    {
      path: "/top-wallets",
      redirect: (to) => ({ name: "top-wallets", params: { page: 1 } }),
      meta: { title: (route: Route) => getTitle("Top Wallets") },
    },
    {
      path: "/top-wallets/:page(\\d+)",
      name: "top-wallets",
      component: TopWalletsComponent,
      meta: { title: (route: Route) => getTitle("Top Wallets") },
    },
    {
      path: "/advanced-search",
      redirect: (to) => ({ name: "advanced-search", params: { page: 1 } }),
      meta: { title: (route: Route) => getTitle("Advanced Search") },
    },
    {
      path: "/advanced-search/:page(\\d+)",
      name: "advanced-search",
      component: AdvancedSearchComponent,
      meta: { title: (route: Route) => getTitle("Advanced Search") },
    },
    {
      path: "/delegates/resigned",
      redirect: (to) => ({ name: "delegates-resigned", params: { page: 1 } }),
      meta: { title: (route: Route) => getTitle("Delegates") },
    },
    {
      path: "/delegates/resigned/:page(\\d+)",
      name: "delegates-resigned",
      component: DelegateComponent,
      meta: { title: (route: Route) => getTitle("Delegates") },
    },
    {
      path: "/delegates",
      redirect: (to) => ({ name: "delegates", params: { page: 1 } }),
      meta: { title: (route: Route) => getTitle("Delegates") },
    },
    {
      path: "/delegates/:page(\\d+)",
      name: "delegates",
      component: DelegateComponent,
      meta: { title: (route: Route) => getTitle("Delegates") },
    },
    {
      path: "/404",
      name: "404",
      component: NotFoundComponent,
      meta: { title: (route: Route) => getTitle("404") },
    },
    {
      path: "*",
      redirect: { name: "404" },
      meta: { title: (route: Route) => getTitle("404") },
    },
    // 2.0 fallback redirects...
    {
      path: "/address/:address",
      redirect: (to) => ({
        name: "wallet",
        params: { address: to.params.address },
      }),
      meta: { title: (route: Route) => getTitle("Wallet") },
    },
    {
      path: "/tx/:id",
      redirect: (to) => ({
        name: "transaction",
        params: { id: to.params.id },
      }),
      meta: { title: (route: Route) => getTitle("Transaction") },
    },
    {
      path: "/delegateMonitor",
      redirect: "/delegate-monitor",
      meta: { title: (route: Route) => getTitle("Delegate Monitor") },
    },
    {
      path: "/topAccounts",
      redirect: (to) => ({ name: "top-wallets", params: { page: 1 } }),
      meta: { title: (route: Route) => getTitle("Top Wallets") },
    },
  ],
  scrollBehavior(
    to: Route,
    from: Route,
    savedPosition: void | Position,
  ): PositionResult | Promise<PositionResult> | void {
    if (to && to.params && Boolean(to.params.disableScroll) === true) {
      return;
    }

    return { x: 0, y: 0 };
  },
});

router.beforeEach((to: Route, from: Route, next: () => void) => {
  NProgress.start();
  store.dispatch("ui/setHeaderType", null);
  store.dispatch("ui/setMenuVisible", false);
  document.title = to.meta.title(to);

  next();
});

router.afterEach(() => {
  NProgress.done(true);
});

export default router;
