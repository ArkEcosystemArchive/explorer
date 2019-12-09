import ApiService from "@/services/api";
import { IApiBridgechainsWrapper } from "../interfaces";

class BridgechainService {
  public async all(page: number = 1, limit: number = 25): Promise<IApiBridgechainsWrapper> {
    const response = (await ApiService.get(`bridgechains`, {
      params: {
        page,
        limit,
      },
    })) as IApiBridgechainsWrapper;

    return response;
  }
}

export default new BridgechainService();
