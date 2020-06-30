import BridgechainService from "@/services/bridgechain";
import store from "@/store";

const bridgechainPropertyArray = ["publicKey", "name", "genesisHash"].sort();
// Note: seedNodes, ports and repository can also be returned, but are optional

describe.skip("Services > bridgechain", () => {
  // Note: devnet server
  beforeAll(() => {
    store.dispatch("network/setServer", "https://dexplorer.ark.io/api/v2");
  });

  it("should return a list of bridgechains", async () => {
    const { data } = await BridgechainService.all();
    expect(data).toHaveLength(25);
    data.forEach((bridgechain) => {
      expect(Object.keys(bridgechain).sort()).toEqual(expect.arrayContaining(bridgechainPropertyArray));
    });
  });

  it("should return bridgechains with page offset", async () => {
    const { data } = await BridgechainService.all(1);
    expect(data).toHaveLength(25);
    data.forEach((bridgechain) => {
      expect(Object.keys(bridgechain).sort()).toEqual(expect.arrayContaining(bridgechainPropertyArray));
    });
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data);
  });

  it("should return bridgechains with page offset and given limit", async () => {
    const { data } = await BridgechainService.all(2, 20);
    expect(data).toHaveLength(20);
    data.forEach((bridgechain) => {
      expect(Object.keys(bridgechain).sort()).toEqual(expect.arrayContaining(bridgechainPropertyArray));
    });
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data);
  });
});
