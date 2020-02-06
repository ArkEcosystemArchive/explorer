import ApiService from "@/services/api";
import { IApiWalletsWrapper, IWalletSearchParams } from "../interfaces";
import { paginationLimit } from "@/constants";

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
    body: IWalletSearchParams,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiWalletsWrapper> {
    const response = (await ApiService.post("wallets/search", body, {
      params: {
        page,
        limit,
      },
    })) as IApiWalletsWrapper;

    return response;
  }
}

export default new WalletService();
