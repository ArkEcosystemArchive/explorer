import ApiService from "@/services/api";
import { IRoundDelegate, IApiRoundDelegatesWrapper } from "../interfaces";

class RoundService {
  public async delegates(round: number): Promise<IRoundDelegate[]> {
    if (round < 1) {
      return [];
    }

    const response = (await ApiService.get(`rounds/${round}/delegates`)) as IApiRoundDelegatesWrapper;

    return response.data;
  }
}

export default new RoundService();
