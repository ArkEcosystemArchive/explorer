import WalletService from "@/services/wallet";
import store from "@/store";

const walletPropertyArray = [
  "address",
  "isDelegate",
  "isResigned",
  "lockedBalance",
  "multiSignature",
  "publicKey",
  "secondPublicKey",
  "username",
  "vote",
].sort();
// Note: publicKey, secondPublicKey, username and vote can also be returned, but are optional

beforeAll(() => {
  store.dispatch("network/setServer", "https://explorer.ark.io/api");
});

describe("Services > Wallet", () => {
  it("should return address when searching for existing wallet", async () => {
    const data = await WalletService.find("ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC");
    expect(Object.keys(data).sort()).toEqual(expect.arrayContaining(walletPropertyArray));
  });

  it("should fail when searching for incorrect wallet address", async () => {
    await expect(WalletService.find("AYCTHSZionfGoQsRnv5gECEuFWcZXS38gsx")).rejects.toThrow();
  });

  it("should return a list of top wallet accounts", async () => {
    const { data } = await WalletService.top();
    expect(data).toHaveLength(25);
    data.forEach((wallet) => {
      expect(Object.keys(wallet).sort()).toEqual(expect.arrayContaining(walletPropertyArray));
    });
  });

  it("should return top wallets with page offset", async () => {
    const { data } = await WalletService.top(1);
    expect(data).toHaveLength(25);
    data.forEach((wallet) => {
      expect(Object.keys(wallet).sort()).toEqual(expect.arrayContaining(walletPropertyArray));
    });
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data);
  });

  it("should return top wallets with page offset and given limit", async () => {
    const { data } = await WalletService.top(2, 20);
    expect(data).toHaveLength(20);
    data.forEach((wallet) => {
      expect(Object.keys(wallet).sort()).toEqual(expect.arrayContaining(walletPropertyArray));
    });
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data);
  });

  it("should return all wallets that vote for '020431436cf94f3c6a6ba566fe9e42678db8486590c732ca6c3803a10a86f50b92'", async () => {
    const { data } = await WalletService.search({
      attributes: { vote: "020431436cf94f3c6a6ba566fe9e42678db8486590c732ca6c3803a10a86f50b92" },
    });
    expect(data).toHaveLength(25);
    data.forEach((wallet) => {
      expect(wallet.vote).toBe("020431436cf94f3c6a6ba566fe9e42678db8486590c732ca6c3803a10a86f50b92");
      expect(Object.keys(wallet).sort()).toEqual(expect.arrayContaining(walletPropertyArray));
    });
  });

  it("should return all wallets that have a balance greater than 100,000", async () => {
    const minBalance = 100000 * 1e8;
    const { data } = await WalletService.search({ balance: { from: minBalance } });
    expect(data).toHaveLength(25);
    data.forEach((wallet) => {
      expect(parseInt(wallet.balance)).toBeGreaterThanOrEqual(minBalance);
      expect(Object.keys(wallet).sort()).toEqual(expect.arrayContaining(walletPropertyArray));
    });
  });

  it("should return the latest wallets when no arguments are passed", async () => {
    const { data } = await WalletService.search();
    expect(data).toHaveLength(25);
    data.forEach((wallet) => {
      expect(Object.keys(wallet).sort()).toEqual(expect.arrayContaining(walletPropertyArray));
    });
  });
});
