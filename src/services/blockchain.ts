import ApiService from "@/services/api";
import { IApiBlockchainWrapper } from "../interfaces";

class BlockchainService {
  public async height(): Promise<number> {
    const response = (await ApiService.get("blockchain")) as IApiBlockchainWrapper;
    return response.data.block.height;
  }

  public async supply(): Promise<string> {
    const response = (await ApiService.get("blockchain")) as IApiBlockchainWrapper;
    return response.data.supply;
  }
}

export default new BlockchainService();
