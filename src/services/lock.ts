import ApiService from "@/services/api";
import { ILock, IApiLockWrapper } from "../interfaces";

class LockService {
  public async find(id: string): Promise<ILock> {
    const response = (await ApiService.get(`locks/${id}`)) as IApiLockWrapper;
    return response.data;
  }
}

export default new LockService();
