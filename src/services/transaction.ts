import ApiService from "@/services/api";
import { IApiTransactionWrapper, IApiTransactionsWrapper, ITransaction, ITransactionSearchParams } from "../interfaces";
import { paginationLimit } from "@/constants";
import { Sanitizer } from "@/utils/Sanitizer";
import emoji from "node-emoji";

const sanitizeVendorField = (transaction: ITransaction) => {
  if (transaction.vendorField) {
    const sanitizer = new Sanitizer();

    if (sanitizer.isBad(transaction.vendorField)) {
      delete transaction.vendorField;
    } else {
      transaction.vendorField = sanitizer.apply(emoji.emojify(transaction.vendorField));
    }
  }

  return transaction;
};

class TransactionService {
  public async latest(limit: number = paginationLimit): Promise<ITransaction[]> {
    const response = (await ApiService.get("transactions", {
      params: {
        orderBy: "timestamp:desc",
        limit,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response.data;
  }

  public async find(id: string): Promise<ITransaction> {
    const response = (await ApiService.get(`transactions/${id}`)) as IApiTransactionWrapper;

    sanitizeVendorField(response.data);

    return response.data;
  }

  public async filterByType(
    page: number,
    type: number,
    typeGroup?: number,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const params: any = {
      orderBy: "timestamp:desc",
      page,
      limit,
    };

    if (type !== -1) {
      params.type = type;
    }

    if (typeGroup) {
      params.typeGroup = typeGroup;
    }

    const response = (await ApiService.get("transactions", {
      params,
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async search(
    body: ITransactionSearchParams,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.post("transactions/search", body, {
      params: {
        page,
        limit,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async byBlock(id: string, page = 1, limit: number = paginationLimit): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.get(`blocks/${id}/transactions`, {
      params: {
        orderBy: "timestamp:desc",
        page,
        limit,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async allByAddress(address: string, page = 1, limit = paginationLimit): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.get(`wallets/${address}/transactions`, {
      params: {
        orderBy: "timestamp:desc",
        page,
        limit,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async sentByAddress(
    address: string,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.get(`wallets/${address}/transactions/sent`, {
      params: {
        orderBy: "timestamp:desc",
        page,
        limit,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async receivedByAddress(
    address: string,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.get(`wallets/${address}/transactions/received`, {
      params: {
        orderBy: "timestamp:desc",
        page,
        limit,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async locksByAddress(
    address: string,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.get(`wallets/${address}/locks`, {
      params: {
        orderBy: "timestamp:desc",
        page,
        limit,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async findUnlockedForLocks(
    transactionIds: string[],
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.post(`locks/unlocked`, {
      ids: transactionIds,
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async sentByAddressCount(senderId: string): Promise<number> {
    const response = (await ApiService.get("transactions", {
      params: {
        senderId,
        limit: 1,
      },
    })) as IApiTransactionsWrapper;
    return response.meta.totalCount;
  }

  public async receivedByAddressCount(recipientId: string): Promise<number> {
    const response = (await ApiService.get("transactions", {
      params: {
        recipientId,
        limit: 1,
      },
    })) as IApiTransactionsWrapper;
    return response.meta.totalCount;
  }

  public async locksByAddressCount(address: string): Promise<number> {
    const response = (await ApiService.get(`wallets/${address}/locks`, {
      params: {
        limit: 1,
      },
    })) as IApiTransactionsWrapper;
    return response.meta.totalCount;
  }
}

export default new TransactionService();
