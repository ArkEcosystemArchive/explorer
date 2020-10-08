import store from "@/store";
import ApiService from "@/services/api";
import { IApiTransactionWrapper, IApiTransactionsWrapper, ITransaction, ITransactionSearchParams } from "../interfaces";
import { paginationLimit } from "@/constants";
import { Sanitizer } from "@/utils/Sanitizer";
import dotify from "node-dotify";
import emoji from "node-emoji";

const sanitizeVendorField = (transaction: ITransaction) => {
  if (transaction.vendorField) {
    const sanitizer = new Sanitizer();
    const smartbridgeFilter = store.getters["ui/smartbridgeFilter"];

    if (smartbridgeFilter === "unfiltered") {
      transaction.vendorField = emoji.emojify(transaction.vendorField);
    } else {
      if (sanitizer.isBad(transaction.vendorField)) {
        delete transaction.vendorField;
      } else {
        transaction.vendorField = sanitizer.apply(emoji.emojify(transaction.vendorField));
      }
    }
  }

  return transaction;
};

class TransactionService {
  public async latest(limit: number = paginationLimit): Promise<ITransaction[]> {
    const response = (await ApiService.get("transactions", {
      params: {
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
    asset?: object,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const parameters: any = {};

    if (type !== -1) {
      parameters.type = type;
    }

    if (typeGroup) {
      parameters.typeGroup = typeGroup;
    }

    if (asset) {
      parameters.asset = asset;
    }

    const response = (await ApiService.get("transactions", {
      params: {
        page,
        limit,
        ...parameters,
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async search(
    parameters: ITransactionSearchParams,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.get("transactions", {
      params: {
        page,
        limit,
        ...dotify(parameters),
      },
    })) as IApiTransactionsWrapper;

    response.data.map(sanitizeVendorField);

    return response;
  }

  public async byBlock(id: string, page = 1, limit: number = paginationLimit): Promise<IApiTransactionsWrapper> {
    const response = (await ApiService.get(`blocks/${id}/transactions`, {
      params: {
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
