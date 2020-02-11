import store from "@/store";

const delegates = [
  { username: "delegate-1", address: "test-address-1", publicKey: "pubkey-1" },
  { username: "delegate-2", address: "test-address-2", publicKey: "pubkey-2" },
];

describe("Store > Delegates", () => {
  it("should set the delegates rate", () => {
    store.dispatch("delegates/setDelegates", { delegates });

    expect(store.getters["delegates/delegates"]).toEqual(delegates);
  });

  it("should set the delegates rate", () => {
    store.dispatch("delegates/setForged", delegates);

    expect(store.getters["delegates/forged"]).toEqual(delegates);
  });

  it("should get a single delegate by its address", () => {
    expect(store.getters["delegates/byAddress"]("test-address-1")).toEqual(delegates[0]);
  });

  it("should return null when delegate with address does not exist", () => {
    expect(store.getters["delegates/byAddress"]("wrong address")).toBe(null);
  });

  it("should get a single delegate by its public key", () => {
    expect(store.getters["delegates/byPublicKey"]("pubkey-2")).toEqual(delegates[1]);
  });

  it("should return null when delegate with public key does not exist", () => {
    expect(store.getters["delegates/byPublicKey"]("wrong public key")).toBe(null);
  });

  it("should get whether delegates are set", () => {
    expect(store.getters["delegates/stateHasDelegates"]).toEqual(true);
  });

  it("should get a single delegate by its username", () => {
    expect(store.getters["delegates/byUsername"]("delegate-1")).toEqual(delegates[0]);
  });

  it("should return null when delegate with username does not exist", () => {
    expect(store.getters["delegates/byUsername"]("wrong username")).toBe(null);
  });
});
