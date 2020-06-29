import secp256k1 from "secp256k1";
import { Buffer } from "buffer/";
import bs58check from "bs58check";
import { sync } from "simple-sha256";
import { ripemd160 } from "hash-wasm";

import store from "@/store";

const numberToHex = (num: number, padding = 2): string => {
  const indexHex: string = Number(num).toString(16);

  return "0".repeat(padding - indexHex.length) + indexHex;
};

const privateKeyFromPassphrase = (passphrase: string): { publicKey: string; privateKey: string } => {
  // @ts-ignore
  const privateKey: Buffer = Buffer.from(sync(passphrase), "hex");

  return {
    publicKey: stringToHex(secp256k1.publicKeyCreate(privateKey, true)),
    // @ts-ignore
    privateKey: privateKey.toString("hex"),
  };
};

const stringToHex = (text: string): string => Buffer.from(text).toString("hex");

const publicKeyFromPassphrase = (passphrase: string): string => privateKeyFromPassphrase(passphrase).publicKey;

const addressFromPublicKey = async (publicKey: string): Promise<string> => {
  const buffer = Buffer.from(await ripemd160(Buffer.from(publicKey, "hex")), "hex");
  const payload = Buffer.alloc(21);

  payload.writeUInt8(store.getters["network/addressPrefix"], 0);
  buffer.copy(payload, 1);

  return bs58check.encode(payload);
};

export default {
  methods: {
    async addressFromPublicKey(publicKey: string): Promise<string> {
      return addressFromPublicKey(publicKey);
    },
    async addressFromMultiSignatureAsset(asset): Promise<string> {
      const { min, publicKeys } = asset;

      for (const publicKey of publicKeys) {
        if (!/^[0-9A-Fa-f]{66}$/.test(publicKey)) {
          throw new Error(publicKey);
        }
      }

      if (min < 1 || min > publicKeys.length) {
        throw new Error();
      }

      const minKey: string = publicKeyFromPassphrase(numberToHex(min));
      const keys: Buffer[] = [minKey, ...publicKeys].map((p) => Buffer.from(p, "hex"));

      return addressFromPublicKey(stringToHex(secp256k1.publicKeyCombine(keys, true)));
    },
  },
};
