import BusinessService from "@/services/business";
import store from "@/store";

const businessPropertyArray = ["address", "publicKey", "name", "website"].sort();
// Note: repository can also be returned, but is optional

describe.skip("Services > Business", () => {
  // Note: devnet server
  beforeAll(() => {
    store.dispatch("network/setServer", "https://dexplorer.ark.io/api/v2");
  });

  it("should return a list of businesses", async () => {
    const { data } = await BusinessService.all();
    expect(data).toHaveLength(25);
    data.forEach((business) => {
      expect(Object.keys(business).sort()).toEqual(expect.arrayContaining(businessPropertyArray));
    });
  });

  it("should return businesses with page offset", async () => {
    const { data } = await BusinessService.all(1);
    expect(data).toHaveLength(25);
    data.forEach((business) => {
      expect(Object.keys(business).sort()).toEqual(expect.arrayContaining(businessPropertyArray));
    });
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data);
  });

  it("should return businesses with page offset and given limit", async () => {
    const { data } = await BusinessService.all(2, 20);
    expect(data).toHaveLength(20);
    data.forEach((business) => {
      expect(Object.keys(business).sort()).toEqual(expect.arrayContaining(businessPropertyArray));
    });
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data);
  });

  it("should return true if business endpoint is enabled", async () => {
    const value = await BusinessService.isEnabled();
    expect(value).toBe(true);
  });

  it("should return false if business endpoint does not exist", async () => {
    // Set to dummy value for the test
    store.dispatch("network/setServer", "https://dexplorer.ark.io/api/asdf");
    const value = await BusinessService.isEnabled();
    expect(value).toBe(false);
  });
});
