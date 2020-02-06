import store from "@/store";
import { WalletService } from "@/services";

const timestampFromDate = (date: string): number => {
  return new Date(date).getTime() / 1000;
};

const getNetworkTimestamp = (date: string): number => {
  const epochTimestamp = timestampFromDate(store.getters["network/epoch"]);

  return timestampFromDate(date) - epochTimestamp;
};

const lookupPublicKey = async (username: string): Promise<string | null> => {
  let lookup = store.getters["delegates/byUsername"](username);

  if (lookup) {
    return lookup.publicKey;
  }

  if (!lookup) {
    try {
      lookup = (await WalletService.find(username)).publicKey;
    } catch (error) {
      lookup = username;
    }
  }

  return lookup;
};

export const inputProcessor = async (
  inputName: string,
  inputValue: any,
): Promise<{ value: string | number; ts: number }> => {
  const ts = Date.now();

  const arktoshiValues = ["amount", "totalAmount", "fee", "totalFee", "reward", "balance"];
  const publicKeyValues = ["vote", "generatorPublicKey"];

  if (arktoshiValues.find((name) => inputName.includes(name))) {
    const valAsNum = Number(inputValue);
    return { value: valAsNum > 0 ? Number(inputValue) * 1e8 : 0, ts };
  }

  if (publicKeyValues.find((name) => inputName.includes(name))) {
    const publicKey = await lookupPublicKey(inputValue);
    return { value: publicKey ? publicKey : inputValue, ts };
  }

  if (inputName.includes("timestamp")) {
    return { value: getNetworkTimestamp(inputValue), ts };
  }

  return { value: inputValue, ts };
};
