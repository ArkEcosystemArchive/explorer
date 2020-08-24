import store from "@/store";

describe("Store > UI", () => {
  it("should enable the night mode", () => {
    store.dispatch("ui/setNightMode", true);

    expect(store.getters["ui/nightMode"]).toEqual(true);
  });

  it("should disable the night mode", () => {
    store.dispatch("ui/setNightMode", false);

    expect(store.getters["ui/nightMode"]).toEqual(false);
  });

  it("should show the price chart", () => {
    store.dispatch("ui/setPriceChartOption", {
      option: "enabled",
      value: true,
    });

    expect(store.getters["ui/priceChartOptions"].enabled).toEqual(true);
  });

  it("should hide the price chart", () => {
    store.dispatch("ui/setPriceChartOption", {
      option: "enabled",
      value: false,
    });

    expect(store.getters["ui/priceChartOptions"].enabled).toEqual(false);
  });

  it("should have 'day' as the default price chart period", () => {
    expect(store.getters["ui/priceChartOptions"].period).toEqual("day");
  });

  it("should set the price chart period", () => {
    store.dispatch("ui/setPriceChartOption", {
      option: "period",
      value: "week",
    });

    expect(store.getters["ui/priceChartOptions"].period).toEqual("week");
  });

  it("should have 'price' as the default price chart type", () => {
    expect(store.getters["ui/priceChartOptions"].type).toEqual("price");
  });

  it("should set the price chart type", () => {
    store.dispatch("ui/setPriceChartOption", {
      option: "type",
      value: "volume",
    });

    expect(store.getters["ui/priceChartOptions"].type).toEqual("volume");
  });

  it("should have English set as default language", () => {
    expect(store.getters["ui/language"]).toEqual("en-GB");
  });

  it("should set the language", () => {
    store.dispatch("ui/setLanguage", "nl-NL");

    expect(store.getters["ui/language"]).toEqual("nl-NL");
  });

  it("should have navigator or English set as default locale", () => {
    expect(store.getters["ui/locale"]).toEqual(navigator.language || "en-GB");
  });

  it("should set the locale", () => {
    store.dispatch("ui/setLocale", "nl-NL");

    expect(store.getters["ui/locale"]).toEqual("nl-NL");
  });

  it("should set the smartbridge filter", () => {
    store.dispatch("ui/setSmartbridgeFilter", "filtered");

    expect(store.getters["ui/smartbridgeFilter"]).toEqual("filtered");
  });

  it("should set the header type", () => {
    store.dispatch("ui/setHeaderType", "headerType");

    expect(store.getters["ui/headerType"]).toEqual("headerType");
  });

  it("should show the menu", () => {
    store.dispatch("ui/setMenuVisible", true);

    expect(store.getters["ui/menuVisible"]).toEqual(true);
  });

  it("should hide the menu", () => {
    store.dispatch("ui/setMenuVisible", false);

    expect(store.getters["ui/menuVisible"]).toEqual(false);
  });

  it("should accept the link disclaimer", () => {
    store.dispatch("ui/setHasAcceptedLinkDisclaimer", true);

    expect(store.getters["ui/hasAcceptedLinkDisclaimer"]).toEqual(true);
  });

  it("should set the block sort params", () => {
    const params = { field: "test" };

    store.dispatch("ui/setBlockSortParams", params);

    expect(store.getters["ui/blockSortParams"]).toEqual(params);
  });

  it("should set the delegate sort params", () => {
    const params = { field: "test" };

    store.dispatch("ui/setDelegateSortParams", params);

    expect(store.getters["ui/delegateSortParams"]).toEqual(params);
  });

  it("should set the transaction sort params", () => {
    const params = { field: "test" };

    store.dispatch("ui/setTransactionSortParams", params);

    expect(store.getters["ui/transactionSortParams"]).toEqual(params);
  });

  it("should set the wallet sort params", () => {
    const params = { field: "test" };

    store.dispatch("ui/setWalletSortParams", params);

    expect(store.getters["ui/walletSortParams"]).toEqual(params);
  });

  it("should set the wallet transaction tab", () => {
    store.dispatch("ui/setWalletTransactionTab", "all");

    expect(store.getters["ui/walletTransactionTab"]).toEqual("all");
  });
});
