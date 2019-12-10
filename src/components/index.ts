import Vue from "vue";

/* tslint:disable:no-var-requires */

// https://github.com/vuejs/vue-loader/releases/tag/v13.0.0

// Utilities
Vue.component("Clipboard", require("@/components/utils/Clipboard").default);
Vue.component("Loader", require("@/components/utils/Loader").default);
Vue.component("Pagination", require("@/components/utils/pagination/Pagination").default);
Vue.component("QrCode", require("@/components/utils/QrCode").default);
Vue.component("TableWrapper", require("@/components/utils/TableWrapper").default);
Vue.component("TransactionAmount", require("@/components/utils/TransactionAmount").default);

// Links
Vue.component("LinkBlock", require("@/components/links/LinkBlock").default);
Vue.component("LinkTransaction", require("@/components/links/LinkTransaction").default);
Vue.component("LinkWallet", require("@/components/links/LinkWallet").default);

// Tables
Vue.component("TableDelegates", require("@/components/tables/DelegateMonitor").default);
Vue.component("MultiPaymentTransactions", require("@/components/tables/MultiPaymentTransactions").default);

Vue.component("TableBlocksDesktop", require("@/components/tables/Blocks").default);
Vue.component("TableTransactionsDesktop", require("@/components/tables/Transactions").default);
Vue.component("TableWalletsDesktop", require("@/components/tables/Wallets").default);
Vue.component("TableLockTransactionsDesktop", require("@/components/tables/LockTransactions").default);
Vue.component("TableBusinessesDesktop", require("@/components/tables/Businesses").default);
Vue.component("TableBridgechainsDesktop", require("@/components/tables/Bridgechains").default);
Vue.component("TableDelegatesDesktop", require("@/components/tables/Delegates").default);

Vue.component("TableBlocksMobile", require("@/components/tables/mobile/Blocks").default);
Vue.component("TableTransactionsMobile", require("@/components/tables/mobile/Transactions").default);
Vue.component("TableWalletsMobile", require("@/components/tables/mobile/Wallets").default);
Vue.component("TableLockTransactionsMobile", require("@/components/tables/mobile/LockTransactions").default);
Vue.component("TableBusinessesMobile", require("@/components/tables/mobile/Businesses").default);
Vue.component("TableBridgechainsMobile", require("@/components/tables/mobile/Bridgechains").default);

// Misc.
Vue.component("ArkMeter", require("@/components/monitor/ArkMeter").default);
Vue.component("ContentHeader", require("@/components/ContentHeader").default);
Vue.component("DisclaimerModal", require("@/components/DisclaimerModal").default);
Vue.component("Modal", require("@/components/Modal").default);
Vue.component("SvgIcon", require("@/components/SvgIcon").default);
