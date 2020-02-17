import ApiService from "@/services/api";
import { IApiBridgechainsWrapper } from "../interfaces";
import { paginationLimit } from "@/constants";

class BridgechainService {
  public async all(page = 1, limit: number = paginationLimit): Promise<IApiBridgechainsWrapper> {
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
