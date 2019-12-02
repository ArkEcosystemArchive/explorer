import { DIDTypes } from "@uns/ts-sdk/dist";
import { ApiService, TransactionService } from "@/services";
import { IUnik } from "@/interfaces";

export class UnikService {
  public async findUnikProperties(unikId) {
    const response = await ApiService.get(`uniks/${unikId}/properties`);
    return response.data;
  }

  /*
      Get property value of a UNIK token
      If property does not exist, returns undefined
  */
  public async findUnikProperty(unikId, unikProperty) {
    let ret;
    const response = await ApiService.get(`uniks/${unikId}/properties/${unikProperty}`);
    ret = response.data;
    return ret;
  }

  public async find(id): Promise<IUnik> {
    const response = await ApiService.get(`uniks/${id}`);
    const unik = response.data;
    unik.properties = await this.findUnikProperties(id).then(this.formatProperties);
    unik.type = await this.findUnikProperty(unik.id, "type").then(type => DIDTypes[type]);
    unik.creation = await this.extractUnikCreationUnixTimestamp(unik);
    return unik;
  }

  public async supply(): Promise<number> {
    const response = await ApiService.get("uniks");
    return response.meta.totalCount;
  }

  public async extractUnikCreationUnixTimestamp(unik: IUnik): Promise<number> {
    return (await TransactionService.find(unik.transactions.first.id)).timestamp.unix;
  }

  /*
    Transforms property into an object with 2 properties 'key' and 'value'
    Removes type property
  */
  public formatProperties(properties): void {
    return properties
      .map(property => {
        const entry = Object.entries(property)[0];
        return {
          key: entry[0],
          value: entry[1],
        };
      })
      .filter(property => property.key !== "type");
  }
}

export default new UnikService();
