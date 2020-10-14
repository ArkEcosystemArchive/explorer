import ApiService from "@/services/api";
import { IApiWalletsWrapper, IWallet, IWalletSearchParams } from "../interfaces";
import { paginationLimit } from "@/constants";
import dotProp from "dot-prop";
import dotify from "node-dotify";

const hydrate = (data: IWallet): IWallet => {
  return {
    address: dotProp.get(data, "address"),
    balance: dotProp.get(data, "balance"),
    username: dotProp.get(data, "attributes.delegate.username"),
    publicKey: dotProp.get(data, "publicKey"),
    vote: dotProp.get(data, "attributes.vote"),
    isDelegate: dotProp.has(data, "attributes.delegate"),
    isResigned: dotProp.get(data, "attributes.delegate.resigned"),
    lockedBalance: dotProp.get(data, "attributes.htlc.lockedBalance"),
    secondPublicKey: dotProp.get(data, "secondPublicKey"),
    multiSignature: dotProp.get(data, "attributes.multiSignature"),
  };
};

const hydrateMany = (wallets: IWallet[]): IWallet[] => {
  return wallets.map((wallet: IWallet) => hydrate(wallet));
};

class WalletService {
  public async find(address: string) {
    const response = await ApiService.get(`wallets/${address}`);
    return hydrate(response.data);
  }

  public async top(page = 1, limit: number = paginationLimit) {
    const response = await ApiService.get("wallets/top", {
      params: {
        page,
        limit,
      },
    });

    response.data = hydrateMany(response.data);

    return response;
  }

  public async search(
    parameters: IWalletSearchParams,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiWalletsWrapper> {
    const response = (await ApiService.get("wallets", {
      params: {
        page,
        limit,
        ...dotify(parameters),
      },
    })) as IApiWalletsWrapper;

    response.data = hydrateMany(response.data);

    return response;
  }
}

export default new WalletService();
