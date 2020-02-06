import ApiService from "@/services/api";
import { IApiBusinessesWrapper } from "../interfaces";
import { paginationLimit } from "@/constants";

class BusinessService {
  public async all(page = 1, limit: number = paginationLimit): Promise<IApiBusinessesWrapper> {
    const response = (await ApiService.get(`businesses`, {
      params: {
        page,
        limit,
      },
    })) as IApiBusinessesWrapper;

    return response;
  }

  public async isEnabled(): Promise<boolean> {
    try {
      const response = (await ApiService.get("businesses", {})) as IApiBusinessesWrapper;
      return response.data ? true : false;
    } catch (e) {
      return false;
    }
  }
}

export default new BusinessService();
