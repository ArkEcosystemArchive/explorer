import store from "@/store";

const timestampFromDate = (date: string): number => {
  return new Date(date).getTime() / 1000;
};

const getNetworkTimestamp = (date: string): number => {
  const epochTimestamp = timestampFromDate(store.getters["network/epoch"]);

  return timestampFromDate(date) - epochTimestamp;
};

const lookupPublicKey = (username: string): string | null => {
  const lookup = store.getters["delegates/byUsername"](username);

  return lookup ? lookup.publicKey : null;
};

export const inputProcessor = (inputName: string, inputValue: any): string | number => {
  const value = inputValue;

  const arktoshiValues = ["amount", "totalAmount", "fee", "totalFee", "reward", "balance"];
  const publicKeyValues = ["vote", "generatorPublicKey"];

  if (arktoshiValues.find(name => inputName.includes(name))) {
    const valAsNum = Number(value);
    return valAsNum > 0 ? Number(value) * 1e8 : 0;
  }

  if (publicKeyValues.find(name => inputName.includes(name))) {
    const publicKey = lookupPublicKey(value);
    return publicKey ? publicKey : value;
  }

  if (inputName.includes("timestamp")) {
    return getNetworkTimestamp(inputValue);
  }

  return value;
};
