import axios from "axios";
import moment from "moment";
import store from "@/store";

const SECONDS_PER_DAY = 86400;

// CryptoCompare supports upto 20 requests per second
const MAX_REQUESTS_PER_SECOND = 1;
const REQUEST_INTERVAL = 50;

const limiter = axios.create({});

limiter.interceptors.request.use((config) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (CryptoCompareService.pendingRequests < MAX_REQUESTS_PER_SECOND) {
        CryptoCompareService.pendingRequests++;
        clearInterval(interval);
        resolve(config);
      }
    }, REQUEST_INTERVAL);
  });
});

limiter.interceptors.response.use(
  (response) => {
    CryptoCompareService.pendingRequests = Math.max(0, CryptoCompareService.pendingRequests - 1);
    return Promise.resolve(response);
  },
  (error) => {
    CryptoCompareService.pendingRequests = Math.max(0, CryptoCompareService.pendingRequests - 1);
    return Promise.reject(error);
  },
);

class CryptoCompareService {
  public static pendingRequests = 0;

  public async get(url: string, options?: any) {
    return limiter.get(url, options);
  }

  public async price(currency: string): Promise<number | undefined> {
    const response = await this.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${store.getters["network/token"]}&tsyms=${currency}`,
    );

    if (response.data.Response === "Error") {
      throw new Error(response.data.Message);
    }

    if (response.data[currency]) {
      return Number(response.data[currency]);
    }
  }

  public async day(): Promise<{ datasets: any; labels: any }> {
    return this.sendRequest("hour", 24, "HH:mm");
  }

  public async week(): Promise<{ datasets: any; labels: any }> {
    return this.sendRequest("day", 7, "DD.MM");
  }

  public async month(): Promise<{ datasets: any; labels: any }> {
    return this.sendRequest("day", 30, "DD.MM");
  }

  public async quarter(): Promise<{ datasets: any; labels: any }> {
    return this.sendRequest("day", 120, "DD.MM");
  }

  public async year(): Promise<{ datasets: any; labels: any }> {
    return this.sendRequest("day", 365, "DD.MM");
  }

  public async sendRequest(
    type: string,
    limit: number,
    dateTimeFormat: string,
  ): Promise<{ datasets: any; labels: any }> {
    const date = Math.round(new Date().getTime() / 1000);
    const token = store.getters["network/token"];

    let targetCurrency = "USD";
    if (store.getters["currency/name"] !== token) {
      targetCurrency = store.getters["currency/name"];
    }

    const response = await this.get(`https://min-api.cryptocompare.com/data/histo${type}`, {
      params: {
        fsym: token,
        tsym: targetCurrency,
        toTs: date,
        limit,
      },
    });

    return this.transform(response.data.Data, dateTimeFormat);
  }

  public async dailyAverage(timestamp: number): Promise<number | null> {
    const networkAlias = store.getters["network/alias"];
    if (networkAlias !== "Main") {
      return null;
    }

    let ts = moment.unix(timestamp).unix();

    // get last second of the day as unix timestamp
    ts = ts - (ts % SECONDS_PER_DAY) + SECONDS_PER_DAY - 1;

    const targetCurrency = store.getters["currency/name"];
    const lastConversion = store.getters["currency/lastConversion"];

    if (lastConversion.to === targetCurrency && lastConversion.timestamp === ts) {
      return lastConversion.rate;
    }

    const token = store.getters["network/token"];
    const cache = JSON.parse(localStorage.getItem(`rates_${targetCurrency}`) as string);

    if (cache && cache[ts]) {
      store.dispatch("currency/setLastConversion", {
        to: targetCurrency,
        timestamp: ts,
        rate: cache[ts],
      });

      return Number(cache[ts]);
    }

    const response = await this.get("https://min-api.cryptocompare.com/data/dayAvg", {
      params: {
        fsym: token,
        tsym: targetCurrency,
        toTs: ts,
      },
    });

    if (response.data.Response === "Error") {
      return null;
    }

    const rate = response.data[targetCurrency];

    store.dispatch("currency/setLastConversion", {
      to: targetCurrency,
      timestamp: ts,
      rate,
    });

    return rate;
  }

  public transform(response: any, dateTimeFormat: string): { datasets: any; labels: any } {
    return {
      labels: response.map((value: any) => {
        return moment.unix(value.time).format(dateTimeFormat);
      }),
      datasets: response,
    };
  }
}

CryptoCompareService.pendingRequests = 0;

export default new CryptoCompareService();
