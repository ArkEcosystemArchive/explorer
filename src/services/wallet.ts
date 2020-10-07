import ApiService from "@/services/api";
import { IApiWalletsWrapper, IWalletSearchParams } from "../interfaces";
import { paginationLimit } from "@/constants";
import dotify from "node-dotify"

class WalletService {
  public async find(address: string) {
    const response = await ApiService.get(`wallets/${address}`);
    return response.data;
  }

  public async top(page = 1, limit: number = paginationLimit) {
    const response = await ApiService.get("wallets/top", {
      params: {
        page,
        limit,
      },
    });
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

    return response;
  }
}

export default new WalletService();
