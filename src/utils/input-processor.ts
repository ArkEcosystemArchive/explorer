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
  let value = inputValue;

  const arktoshiValues = ["amount", "totalAmount", "fee", "totalFee", "reward", "balance"];
  const publicKeyValues = ["vote", "generatorPublicKey"];

  if (arktoshiValues.filter(name => name.includes(inputName)).length) {
    value = Number(value) * 1e8;
  }

  if (publicKeyValues.filter(name => name.includes(inputName)).length) {
    value = lookupPublicKey(value);
  }

  if (inputName.includes("timestamp")) {
    value = getNetworkTimestamp(inputValue);
  }

  return value;
};
