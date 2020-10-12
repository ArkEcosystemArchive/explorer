import ApiService from "@/services/api";
import { IApiBlockWrapper, IApiBlocksWrapper, IBlock, IBlockSearchParams } from "../interfaces";
import { paginationLimit } from "@/constants";
import dotify from "node-dotify";

class BlockService {
  public async latest(limit: number = paginationLimit): Promise<IBlock[]> {
    const response = (await ApiService.get("blocks", {
      params: {
        limit,
      },
    })) as IApiBlocksWrapper;

    return response.data;
  }

  public async last(): Promise<IBlock> {
    const response = (await ApiService.get("blocks", {
      params: {
        limit: 1,
      },
    })) as IApiBlocksWrapper;

    return response.data![0];
  }

  public async find(id: string): Promise<IBlock> {
    const response = (await ApiService.get(`blocks/${id}`)) as IApiBlockWrapper;

    return response.data;
  }

  public async paginate(page: number, limit = paginationLimit): Promise<IApiBlocksWrapper> {
    const response = (await ApiService.get("blocks", {
      params: {
        page,
        limit,
      },
    })) as IApiBlocksWrapper;

    return response;
  }

  public async byAddress(address: string, page: number, limit = paginationLimit): Promise<IApiBlocksWrapper> {
    const response = (await ApiService.get(`delegates/${address}/blocks`, {
      params: {
        page,
        limit,
      },
    })) as IApiBlocksWrapper;

    return response;
  }

  public async findPrevious(height: number): Promise<IBlock> {
    const response = (await ApiService.get("blocks", {
      params: {
        height: height - 1,
      },
    })) as IApiBlocksWrapper;

    return response.data![0];
  }

  public async findNext(height: number): Promise<IBlock> {
    const response = (await ApiService.get("blocks", {
      params: {
        height: height + 1,
      },
    })) as IApiBlocksWrapper;

    return response.data![0];
  }

  public async search(
    parameters: IBlockSearchParams,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiBlocksWrapper> {
    const response = (await ApiService.get("blocks", {
      params: {
        page,
        limit,
        ...dotify(parameters),
      },
    })) as IApiBlocksWrapper;

    return response;
  }
}

export default new BlockService();
