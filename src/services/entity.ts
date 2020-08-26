import ApiService from "@/services/api";

class EntityService {
  public async isEnabled(): Promise<boolean> {
    try {
      const response = await ApiService.get("entities", {});
      return response.data ? true : false;
    } catch (e) {
      return false;
    }
  }
}

export default new EntityService();
