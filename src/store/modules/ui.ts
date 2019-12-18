/* tslint:disable:no-shadowed-variable */
import * as types from "../mutation-types";
import { IStorePayload, IUiState } from "../../interfaces";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const namespaced = true;
const state: IUiState = {
  language: "en-GB",
  locale: navigator.language || "en-GB",
  nightMode: false,
  priceChartOptions: {
    enabled: true,
    period: "day",
    type: "price",
  },
  headerType: null,
  menuVisible: false,
  hasAcceptedLinkDisclaimer: false,
  blockSortParams: null,
  businessSortParams: null,
  bridgechainSortParams: null,
  delegateSortParams: null,
  transactionSortParams: null,
  walletSortParams: null,
  walletTransactionTab: "all",
};

const actions: ActionTree<IUiState, {}> = {
  setLanguage: ({ commit }, value: string) => {
    localStorage.setItem("language", value);

    commit({
      type: types.SET_UI_LANGUAGE,
      value,
    });
  },
  setLocale: ({ commit }, value: string) => {
    localStorage.setItem("locale", value);

    commit({
      type: types.SET_UI_LOCALE,
      value,
    });
  },
  setNightMode: ({ commit }, value: boolean) => {
    localStorage.setItem("nightMode", value.toString());

    commit({
      type: types.SET_UI_NIGHT_MODE,
      value,
    });
  },
  setHeaderType: ({ commit }, value: string) => {
    commit({
      type: types.SET_UI_MENU_VISIBLE,
      value: null,
    });

    commit({
      type: types.SET_UI_HEADER_TYPE,
      value,
    });
  },
  setMenuVisible: ({ commit }, value: boolean) => {
    commit({
      type: types.SET_UI_HEADER_TYPE,
      value: null,
    });

    commit({
      type: types.SET_UI_MENU_VISIBLE,
      value,
    });
  },
  setHasAcceptedLinkDisclaimer: ({ commit }, value: boolean) => {
    localStorage.setItem("hasAcceptedLinkDisclaimer", JSON.stringify(value));

    commit({
      type: types.SET_UI_HAS_ACCEPTED_LINK_DISCLAIMER,
      value,
    });
  },
  setPriceChartOption: ({ dispatch, getters }, { option, value }) => {
    const options = { ...getters.priceChartOptions };
    options[option] = value;

    dispatch("setPriceChartOptions", options);
  },
  setPriceChartOptions: ({ commit }, value) => {
    localStorage.setItem("priceChartOptions", JSON.stringify(value));

    commit({
      type: types.SET_UI_PRICE_CHART_OPTIONS,
      value,
    });
  },
  setBlockSortParams: ({ commit }, value) => {
    value = JSON.stringify(value);

    localStorage.setItem("blockSortParams", value);

    commit({
      type: types.SET_UI_BLOCK_SORT_PARAMS,
      value,
    });
  },
  setBusinessSortParams: ({ commit }, value) => {
    value = JSON.stringify(value);

    localStorage.setItem("businessSortParams", value);

    commit({
      type: types.SET_UI_BUSINESS_SORT_PARAMS,
      value,
    });
  },
  setBridgechainSortParams: ({ commit }, value) => {
    value = JSON.stringify(value);

    localStorage.setItem("bridgechainSortParams", value);

    commit({
      type: types.SET_UI_BRIDGECHAIN_SORT_PARAMS,
      value,
    });
  },
  setDelegateSortParams: ({ commit }, value) => {
    value = JSON.stringify(value);

    localStorage.setItem("delegateSortParams", value);

    commit({
      type: types.SET_UI_DELEGATE_SORT_PARAMS,
      value,
    });
  },
  setTransactionSortParams: ({ commit }, value) => {
    value = JSON.stringify(value);

    localStorage.setItem("transactionSortParams", value);

    commit({
      type: types.SET_UI_TRANSACTION_SORT_PARAMS,
      value,
    });
  },
  setWalletSortParams: ({ commit }, value) => {
    value = JSON.stringify(value);

    localStorage.setItem("walletSortParams", value);

    commit({
      type: types.SET_UI_WALLET_SORT_PARAMS,
      value,
    });
  },
  setWalletTransactionTab: ({ commit }, value) => {
    commit({
      type: types.SET_UI_WALLET_TRANSACTION_TAB,
      value,
    });
  },
};

const mutations: MutationTree<IUiState> = {
  [types.SET_UI_LANGUAGE](state, payload: IStorePayload) {
    state.language = payload.value;
  },
  [types.SET_UI_LOCALE](state, payload: IStorePayload) {
    state.locale = payload.value;
  },
  [types.SET_UI_NIGHT_MODE](state, payload: IStorePayload) {
    state.nightMode = payload.value;
  },
  [types.SET_UI_HEADER_TYPE](state, payload: IStorePayload) {
    state.headerType = payload.value;
  },
  [types.SET_UI_MENU_VISIBLE](state, payload: IStorePayload) {
    state.menuVisible = payload.value;
  },
  [types.SET_UI_HAS_ACCEPTED_LINK_DISCLAIMER](state, payload: IStorePayload) {
    state.hasAcceptedLinkDisclaimer = payload.value;
  },
  [types.SET_UI_PRICE_CHART_OPTIONS](state, payload: IStorePayload) {
    state.priceChartOptions = payload.value;
  },
  [types.SET_UI_BLOCK_SORT_PARAMS](state, payload: IStorePayload) {
    state.blockSortParams = payload.value;
  },
  [types.SET_UI_BUSINESS_SORT_PARAMS](state, payload: IStorePayload) {
    state.businessSortParams = payload.value;
  },
  [types.SET_UI_BRIDGECHAIN_SORT_PARAMS](state, payload: IStorePayload) {
    state.bridgechainSortParams = payload.value;
  },
  [types.SET_UI_DELEGATE_SORT_PARAMS](state, payload: IStorePayload) {
    state.delegateSortParams = payload.value;
  },
  [types.SET_UI_TRANSACTION_SORT_PARAMS](state, payload: IStorePayload) {
    state.transactionSortParams = payload.value;
  },
  [types.SET_UI_WALLET_SORT_PARAMS](state, payload: IStorePayload) {
    state.walletSortParams = payload.value;
  },
  [types.SET_UI_WALLET_TRANSACTION_TAB](state, payload: IStorePayload) {
    state.walletTransactionTab = payload.value;
  },
};

const getters: GetterTree<IUiState, {}> = {
  language: state => state.language,
  locale: state => state.locale,
  nightMode: state => state.nightMode,
  priceChartOptions: state => state.priceChartOptions,
  headerType: state => state.headerType,
  menuVisible: state => state.menuVisible,

  hasAcceptedLinkDisclaimer(state) {
    return state.hasAcceptedLinkDisclaimer || localStorage.getItem("hasAcceptedLinkDisclaimer");
  },

  blockSortParams(state) {
    const params = state.blockSortParams || localStorage.getItem("blockSortParams");
    return params ? JSON.parse(params) : { field: "height", type: "desc" };
  },

  businessSortParams(state) {
    const params = state.businessSortParams || localStorage.getItem("businessSortParams");
    return params ? JSON.parse(params) : { field: "name", type: "asc" };
  },

  bridgechainSortParams(state) {
    const params = state.bridgechainSortParams || localStorage.getItem("bridgechainSortParams");
    return params ? JSON.parse(params) : { field: "name", type: "asc" };
  },

  delegateSortParams(state) {
    const params = state.delegateSortParams || localStorage.getItem("delegateSortParams");
    return params
      ? JSON.parse(params)
      : {
          active: { field: "rank", type: "asc" },
          standby: { field: "rank", type: "asc" },
          resigned: { field: "votes", type: "asc" },
          table: { field: "rank", type: "asc" },
          tableResigned: { field: "votes", type: "asc" },
        };
  },

  transactionSortParams(state) {
    const params = state.transactionSortParams || localStorage.getItem("transactionSortParams");
    return params ? JSON.parse(params) : { field: "timestamp.unix", type: "desc" };
  },

  walletSortParams(state) {
    const params = state.walletSortParams || localStorage.getItem("walletSortParams");
    return params ? JSON.parse(params) : { field: "originalIndex", type: "asc" };
  },

  walletTransactionTab: state => state.walletTransactionTab,
};

export const ui: Module<IUiState, {}> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
