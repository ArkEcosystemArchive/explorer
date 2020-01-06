import { ApiService, ForgingService, WalletService, RoundService } from "@/services";
import { roundFromHeight } from "@/utils";
import store from "@/store";
import { IApiDelegateWrapper, IApiDelegatesWrapper, IApiWalletsWrapper, IDelegate } from "../interfaces";

class DelegateService {
  public async fetchEveryDelegate(): Promise<IDelegate[]> {
    const response = (await ApiService.get("delegates", {
      params: {
        page: 1,
      },
    })) as IApiDelegatesWrapper;

    const requests = [];

    for (let index = 2; index <= response.meta.pageCount; index++) {
      requests.push(
        ApiService.get("delegates", {
          params: {
            page: index,
          },
        }),
      );
    }

    const results = await Promise.all(requests);

    return response.data.concat([].concat(...results.map(result => result.data)));
  }

  public async all(page: number = 1, limit: number = 25): Promise<IApiDelegatesWrapper> {
    const response = (await ApiService.get("delegates", {
      params: {
        page,
        limit,
      },
    })) as IApiDelegatesWrapper;

    return response;
  }

  public async voters(query: string, page: number, limit = 25): Promise<IApiWalletsWrapper> {
    const response = (await ApiService.get(`delegates/${query}/voters`, {
      params: {
        page,
        limit,
      },
    })) as IApiWalletsWrapper;

    return response;
  }

  public async voterCount(publicKey: string, excludeLowBalances: boolean = true): Promise<number> {
    const response = (await WalletService.search(
      {
        vote: publicKey,
        balance: {
          from: excludeLowBalances ? 1e7 : 0,
        },
      },
      1,
      1,
    )) as IApiWalletsWrapper;

    return response.meta.totalCount;
  }

  public async find(query: string): Promise<IDelegate> {
    const response = (await ApiService.get(`delegates/${query}`)) as IApiDelegateWrapper;
    return response.data;
  }

  public async active(): Promise<IDelegate[]> {
    const activeDelegates = store.getters["network/activeDelegates"];
    const height = store.getters["network/height"];
    const previousDelegates = await RoundService.delegates(roundFromHeight(height) - 1);

    const response = (await ApiService.get("delegates", {
      params: {
        limit: activeDelegates,
      },
    })) as IApiDelegatesWrapper;

    return response.data.map(delegate => {
      delegate.forgingStatus = ForgingService.status(delegate, height, previousDelegates);

      return delegate;
    });
  }

  public async standby(): Promise<IDelegate[]> {
    const activeDelegates = store.getters["network/activeDelegates"];

    const response = (await ApiService.get("delegates", {
      params: {
        offset: activeDelegates,
        limit: activeDelegates,
      },
    })) as IApiDelegatesWrapper;

    return response.data;
  }

  public async resigned(): Promise<IDelegate[]> {
    const response = await this.allResigned();
    return response.data;
  }

  public async allResigned(page: number = 1, limit: number = 25): Promise<IApiDelegatesWrapper> {
    const response = (await ApiService.get("delegates", {
      params: {
        type: "resigned",
        page,
        limit,
      },
    })) as IApiDelegatesWrapper;

    return response;
  }

  public async forged(): Promise<Array<{ delegate: string; forged: number }>> {
    const activeDelegates = store.getters["network/activeDelegates"];

    const response = (await ApiService.get("delegates", {
      params: {
        limit: activeDelegates,
      },
    })) as IApiDelegatesWrapper;

    return response.data.map((delegate, index) => {
      return {
        delegate: delegate.publicKey,
        forged: Number(delegate.forged.total),
      };
    });
  }

  public async activeDelegatesCount(): Promise<number> {
    const response = (await ApiService.get("delegates", {
      params: {
        limit: 1,
      },
    })) as IApiDelegatesWrapper;
    return response.meta.totalCount;
  }
}

export default new DelegateService();
