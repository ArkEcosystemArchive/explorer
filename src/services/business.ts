import ApiService from "@/services/api";
import { IApiBusinessesWrapper } from "../interfaces";

class BusinessService {
  public async all(page: number = 1, limit: number = 25): Promise<IApiBusinessesWrapper> {
    const response = (await ApiService.get(`businesses`, {
      params: {
        page,
        limit,
      },
    })) as IApiBusinessesWrapper;

    return response;
  }
}

export default new BusinessService();
