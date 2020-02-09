import LockService from "@/services/lock";
import store from "@/store";

const lockPropertyArray = [
  "lockId",
  "amount",
  "secretHash",
  "senderPublicKey",
  "recipientId",
  "timestamp",
  "expirationType",
  "expirationValue",
  "isExpired",
].sort();
// Note: vendorField can also be returned, but is optional

describe("Services > Lock", () => {
  beforeAll(() => {
    store.dispatch("network/setServer", "https://dexplorer.ark.io/api/v2");
  });

  it("should find a lock by its id", async () => {
    const data = await LockService.find("f82af75b25da5ce4485c586d8a467fe13460134ab86cafa2ad9633127f88935f");
    expect(Object.keys(data).sort()).toEqual(expect.arrayContaining(lockPropertyArray));
  });
}
