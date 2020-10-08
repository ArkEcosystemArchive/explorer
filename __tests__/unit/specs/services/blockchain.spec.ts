import BlockchainService from "@/services/blockchain";
import store from "@/store";

describe("Blockchain Service", () => {
  beforeAll(() => {
    store.dispatch("network/setServer", "https://explorer.ark.io/api");
  });

  it("should return the block height", async () => {
    const data = await BlockchainService.height();
    expect(data).toBeGreaterThan(4771470);
  });

  it("should return the supply", async () => {
    const data = await BlockchainService.supply();
    expect(data).toBeDefined();
  });
});
