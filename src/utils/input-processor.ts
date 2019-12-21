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

export const inputProcessor = (name: string, inputValue: any): string | number => {
  let value = inputValue;

  if (
    name.includes("amount") ||
    name.includes("totalAmount") ||
    name.includes("fee") ||
    name.includes("totalFee") ||
    name.includes("reward") ||
    name.includes("balance")
  ) {
    value = Number(value) * 1e8;
  }

  if (name.includes("timestamp")) {
    value = getNetworkTimestamp(inputValue);
  }

  if (name.includes("vote") || name.includes("generatorPublicKey")) {
    value = lookupPublicKey(value);
  }

  return value;
};
