import ApiService from "@/services/api";

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

  public async search(data: any, config: object = {}) {
    const response = await ApiService.post("wallets/search", data, config);
    return response;
  }
}

export default new WalletService();
