import ApiService from "@/services/api";
import { IApiWalletsWrapper, IWalletSearchParams } from "../interfaces";

class WalletService {
  public async find(address: string) {
    const response = await ApiService.get(`wallets/${address}`);
    return response.data;
  }

  public async top(page: number = 1, limit: number = 25) {
    const response = await ApiService.get("wallets/top", {
      params: {
        page,
        limit,
      },
    });
    return response;
  }

  public async search(body: IWalletSearchParams, page: number = 1, limit: number = 25): Promise<IApiWalletsWrapper> {
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
