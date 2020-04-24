import ApiService from "@/services/api";
import { ILock, IApiLockWrapper, IApiLocksWrapper } from "../interfaces";
import { paginationLimit } from "@/constants";

class LockService {
  public async paginate(page: number, limit = paginationLimit): Promise<IApiLocksWrapper> {
    const response = (await ApiService.get("locks", {
      params: {
        page,
        limit,
      },
    })) as IApiLocksWrapper;

    return response;
  }

  public async find(id: string): Promise<ILock> {
    const response = (await ApiService.get(`locks/${id}`)) as IApiLockWrapper;
    return response.data;
  }
}

export default new LockService();
