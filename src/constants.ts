import { ITransactionType } from "@/interfaces";
import {
  CoreTransaction,
  MagistrateTransaction,
  TypeGroupTransaction,
  MagistrateTransactionEntityAction,
  MagistrateTransactionEntityType,
  MagistrateTransactionEntitySubType,
} from "@/enums";

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
  // Magistrate 2.0
  {
    key: "BUSINESS_ENTITY_REGISTRATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.BUSINESS,
      action: MagistrateTransactionEntityAction.REGISTER,
    },
  },
  {
    key: "BUSINESS_ENTITY_RESIGNATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.BUSINESS,
      action: MagistrateTransactionEntityAction.RESIGN,
    },
  },
  {
    key: "BUSINESS_ENTITY_UPDATE",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.BUSINESS,
      action: MagistrateTransactionEntityAction.UPDATE,
    },
  },
  {
    key: "PRODUCT_ENTITY_REGISTRATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.PRODUCT,
      action: MagistrateTransactionEntityAction.REGISTER,
    },
  },
  {
    key: "PRODUCT_ENTITY_RESIGNATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.PRODUCT,
      action: MagistrateTransactionEntityAction.RESIGN,
    },
  },
  {
    key: "PRODUCT_ENTITY_UPDATE",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.PRODUCT,
      action: MagistrateTransactionEntityAction.UPDATE,
    },
  },
  {
    key: "PLUGIN_ENTITY_REGISTRATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.PLUGIN,
      action: MagistrateTransactionEntityAction.REGISTER,
    },
  },
  {
    key: "PLUGIN_ENTITY_RESIGNATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.PLUGIN,
      action: MagistrateTransactionEntityAction.RESIGN,
    },
  },
  {
    key: "PLUGIN_ENTITY_UPDATE",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.PLUGIN,
      action: MagistrateTransactionEntityAction.UPDATE,
    },
  },
  {
    key: "MODULE_ENTITY_REGISTRATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.MODULE,
      action: MagistrateTransactionEntityAction.REGISTER,
    },
  },
  {
    key: "MODULE_ENTITY_RESIGNATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.MODULE,
      action: MagistrateTransactionEntityAction.RESIGN,
    },
  },
  {
    key: "MODULE_ENTITY_UPDATE",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.MODULE,
      action: MagistrateTransactionEntityAction.UPDATE,
    },
  },
  {
    key: "DELEGATE_ENTITY_REGISTRATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.DELEGATE,
      action: MagistrateTransactionEntityAction.REGISTER,
    },
  },
  {
    key: "DELEGATE_ENTITY_RESIGNATION",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.DELEGATE,
      action: MagistrateTransactionEntityAction.RESIGN,
    },
  },
  {
    key: "DELEGATE_ENTITY_UPDATE",
    type: MagistrateTransaction.ENTITY,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
    asset: {
      type: MagistrateTransactionEntityType.DELEGATE,
      action: MagistrateTransactionEntityAction.UPDATE,
    },
  },
  // Magistrate 1.0
  {
    key: "LEGACY_BUSINESS_REGISTRATION",
    type: MagistrateTransaction.BUSINESS_REGISTRATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "LEGACY_BUSINESS_RESIGNATION",
    type: MagistrateTransaction.BUSINESS_RESIGNATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "LEGACY_BUSINESS_UPDATE",
    type: MagistrateTransaction.BUSINESS_UPDATE,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "LEGACY_BRIDGECHAIN_REGISTRATION",
    type: MagistrateTransaction.BRIDGECHAIN_REGISTRATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "LEGACY_BRIDGECHAIN_RESIGNATION",
    type: MagistrateTransaction.BRIDGECHAIN_RESIGNATION,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
  {
    key: "LEGACY_BRIDGECHAIN_UPDATE",
    type: MagistrateTransaction.BRIDGECHAIN_UPDATE,
    typeGroup: TypeGroupTransaction.MAGISTRATE,
  },
];

export const apiLimit = 100;
export const paginationLimit = 25;
