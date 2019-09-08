import ApiService from "@/services/api";

class BlockService {
  public async latest(limit: number = 25) {
    const response = await ApiService.get("blocks", {
      params: {
        limit,
      },
    });

    if (response) {
      return response.data;
    }
  }

  public async last() {
    const response = await ApiService.get("blocks", {
      params: {
        limit: 1,
      },
    });

    if (response) {
      return response.data[0];
    }
  }

  public async find(id: string) {
    const response = await ApiService.get(`blocks/${id}`);

    if (response) {
      return response.data;
    }
  }

  public async paginate(page: number, limit = 25) {
    const response = await ApiService.get("blocks", {
      params: {
        page,
        limit,
      },
    });

    return response;
  }

  public async byAddress(address: string, page: number, limit = 25) {
    const response = await ApiService.get(`delegates/${address}/blocks`, {
      params: {
        page,
        limit,
      },
    });

    return response;
  }

  public async findPrevious(height: number) {
    const response = await ApiService.get("blocks", {
      params: {
        height: height - 1,
      },
    });

    if (response) {
      return response.data[0];
    }
  }

  public async findNext(height: number) {
    const response = await ApiService.get("blocks", {
      params: {
        height: height + 1,
      },
    });

    if (response) {
      return response.data[0];
    }
  }
}

export default new BlockService();
