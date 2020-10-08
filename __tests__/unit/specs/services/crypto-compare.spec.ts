import CryptoCompareService from "@/services/crypto-compare";
import store from "@/store";

describe("Services > CryptoCompare", () => {
  beforeAll(() => {
    store.dispatch("network/setServer", "https://explorer.ark.io/api");
    store.dispatch("network/setAlias", "Main");
    store.dispatch("network/setToken", "ARK");
    store.dispatch("currency/setName", "USD");
  });

  it("should return price for ARK in given currency", async () => {
    const data = await CryptoCompareService.price("USD");
    expect(data).toBeGreaterThan(0);
  });

  it("should return day values", async () => {
    const data = await CryptoCompareService.day();
    expect(data.labels.length).toBe(25);
    expect(data.datasets.length).toBe(25);
  });

  it("should return week values", async () => {
    const data = await CryptoCompareService.week();
    expect(data.labels.length).toBe(8);
    expect(data.datasets.length).toBe(8);
  });

  it("should return month values", async () => {
    const data = await CryptoCompareService.month();
    expect(data.labels.length).toBeGreaterThanOrEqual(29);
    expect(data.datasets.length).toBeGreaterThanOrEqual(29);
  });

  it("should return quarter values", async () => {
    const data = await CryptoCompareService.quarter();
    expect(data.labels.length).toBe(121);
    expect(data.datasets.length).toBe(121);
  });

  it("should return year values", async () => {
    const data = await CryptoCompareService.year();
    expect(data.labels.length).toBeGreaterThanOrEqual(366);
    expect(data.datasets.length).toBeGreaterThanOrEqual(366);
  });

  it("should return year values, even if token matches currency", async () => {
    store.dispatch("currency/setName", "ARK");
    const data = await CryptoCompareService.year();
    expect(data.labels.length).toBeGreaterThanOrEqual(366);
    expect(data.datasets.length).toBeGreaterThanOrEqual(366);
  });

  it("should return the daily average for a given timestamp and valid currency", async () => {
    store.dispatch("currency/setName", "USD");
    const data = await CryptoCompareService.dailyAverage(1535190579);
    // CryptoCompare reports different values for BTC and ETH conversion
    expect(data === 0.8434 || data === 0.8496).toBe(true);
  });

  it("should return null for a given timestamp and invalid currency", async () => {
    store.dispatch("currency/setName", "???");
    const data = await CryptoCompareService.dailyAverage(1535190579);
    expect(data).toBe(null);
  });

  it("should return null if not on Main network", async () => {
    store.dispatch("network/setAlias", "Development");
    store.dispatch("currency/setName", "DARK");
    const data = await CryptoCompareService.dailyAverage(1535190579);
    expect(data).toBe(null);
  });
});
