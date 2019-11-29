export enum CoreTransaction {
  TRANSFER = 0,
  SECOND_SIGNATURE = 1,
  DELEGATE_REGISTRATION = 2,
  VOTE = 3,
  MULTI_SIGNATURE = 4,
  IPFS = 5,
  MULTI_PAYMENT = 6,
  DELEGATE_RESIGNATION = 7,
  TIMELOCK = 8,
  TIMELOCK_CLAIM = 9,
  TIMELOCK_REFUND = 10,
}

export enum MagistrateTransaction {
  BUSINESS_REGISTRATION = 0,
  BUSINESS_RESIGNATION = 1,
  BUSINESS_UPDATE = 2,
  BRIDGECHAIN_REGISTRATION = 3,
  BRIDGECHAIN_RESIGNATION = 4,
  BRIDGECHAIN_UPDATE = 5,
}

export enum NftTransaction {
  NFT_MINT = 0,
  NFT_UPDATE = 1,
  NFT_TRANSFER = 2,
}

export enum UNSTransaction {
  DISCLOSE_EXPLICIT = 0,
}

export enum TypeGroupTransaction {
  CORE = 1,
  MAGISTRATE = 2,
  NFT = 2000,
  UNS = 2001,
}

export enum ForgingStatus {
  Forging,
  Missing,
  NotForging,
  NeverForged,
  BecameActive,
}
