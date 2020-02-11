import BigNumberJS from "bignumber.js";

export class BigNumber extends BigNumberJS {
  public static readonly ZERO: BigNumber = BigNumber.make(0);
  public static readonly ONE: BigNumber = BigNumber.make(1);
  public static readonly SATOSHI: BigNumber = BigNumber.make(1e8);

  public static make(value: BigNumberJS.Value, base?: number): BigNumber {
    return new BigNumber(value, base);
  }
}

BigNumberJS.config({ DECIMAL_PLACES: 8, EXPONENTIAL_AT: 1e9 });
