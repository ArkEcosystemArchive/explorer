import { ITransactionType } from "@/interfaces";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";

export const URI_QRCODE_SCHEME_PREFIX = "ark:";

export const transactionTypes: ITransactionType[] = [
  { key: "ALL", type: -1 },
  { key: "TRANSFER", type: CoreTransaction.TRANSFER, typeGroup: TypeGroupTransaction.CORE },
  { key: "SECOND_SIGNATURE", type: CoreTransaction.SECOND_SIGNATURE, typeGroup: TypeGroupTransaction.CORE },
  { key: "DELEGATE_REGISTRATION", type: CoreTransaction.DELEGATE_REGISTRATION, typeGroup: TypeGroupTransaction.CORE },
  { key: "VOTE", type: CoreTransaction.VOTE, typeGroup: TypeGroupTransaction.CORE },
  { key: "MULTI_SIGNATURE", type: CoreTransaction.MULTI_SIGNATURE, typeGroup: TypeGroupTransaction.CORE },
  { key: "IPFS", type: CoreTransaction.IPFS, typeGroup: TypeGroupTransaction.CORE },
  { key: "MULTI_PAYMENT", type: CoreTransaction.MULTI_PAYMENT, typeGroup: TypeGroupTransaction.CORE },
  { key: "DELEGATE_RESIGNATION", type: CoreTransaction.DELEGATE_RESIGNATION, typeGroup: TypeGroupTransaction.CORE },
  { key: "TIMELOCK", type: CoreTransaction.TIMELOCK, typeGroup: TypeGroupTransaction.CORE },
  { key: "TIMELOCK_CLAIM", type: CoreTransaction.TIMELOCK_CLAIM, typeGroup: TypeGroupTransaction.CORE },
  { key: "TIMELOCK_REFUND", type: CoreTransaction.TIMELOCK_REFUND, typeGroup: TypeGroupTransaction.CORE },
  {
    key: "BUSINESS_REGISTRATION",
    type: MagistrateTransaction.BUSINESS_REGISTRATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "BUSINESS_RESIGNATION",
    type: MagistrateTransaction.BUSINESS_RESIGNATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  { key: "BUSINESS_UPDATE", type: MagistrateTransaction.BUSINESS_UPDATE, typeGroup: TypeGroupTransaction.MAGISTRATE },
  {
    key: "BRIDGECHAIN_REGISTRATION",
    type: MagistrateTransaction.BRIDGECHAIN_REGISTRATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "BRIDGECHAIN_RESIGNATION",
    type: MagistrateTransaction.BRIDGECHAIN_RESIGNATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "BRIDGECHAIN_UPDATE",
    type: MagistrateTransaction.BRIDGECHAIN_UPDATE,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
];

export const apiLimit = 100;
export const paginationLimit = 25;
