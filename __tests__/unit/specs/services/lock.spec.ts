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

  it("should return lock", async () => {
    const { data } = await LockService.paginate();

    data.forEach(lock => {
      expect(Object.keys(lock).sort()).toEqual(expect.arrayContaining(lockPropertyArray));
    });
  });

  it("should find a lock by its id", async () => {
    const { data } = await LockService.paginate();

    if (data.length) {
      const lock = await LockService.find(data[0].lockId);
      expect(Object.keys(lock).sort()).toEqual(expect.arrayContaining(lockPropertyArray));
    }
  });
}
