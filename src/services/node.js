import ApiService from "@/services/api";

class NodeService {
  async config() {
    const response = await ApiService.get("node/configuration");

    return response.data;
  }

  async status() {
    const response = await ApiService.get("node/status");

    return response.data;
  }
}

export default new NodeService();
