import {
  CoreTransaction,
  MagistrateTransaction,
  TypeGroupTransaction,
  MagistrateTransactionEntityType,
  MagistrateTransactionEntitySubType,
  MagistrateTransactionEntityAction,
} from "@/enums";

const isCoreTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.CORE;
};

const isMagistrateTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.MAGISTRATE;
};

export default {
  methods: {
    isTransfer(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TRANSFER;
    },

    isSecondSignature(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.SECOND_SIGNATURE;
    },

    isDelegateRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_REGISTRATION;
    },

    isVote(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.VOTE;
    },

    isMultiSignature(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_SIGNATURE;
    },

    isIpfs(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.IPFS;
    },

    isDelegateResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_RESIGNATION;
    },

    isMultiPayment(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_PAYMENT;
    },

    isTimelock(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK;
    },

    isTimelockClaim(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_CLAIM;
    },

    isTimelockRefund(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_REFUND;
    },

    // Magistrate 2.0

    isEntityRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        isMagistrateTypeGroup(typeGroup) &&
        type === MagistrateTransaction.ENTITY &&
        asset &&
        asset.action === MagistrateTransactionEntityAction.REGISTER
      );
    },

    isEntityResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        isMagistrateTypeGroup(typeGroup) &&
        type === MagistrateTransaction.ENTITY &&
        asset &&
        asset.action === MagistrateTransactionEntityAction.RESIGN
      );
    },

    isEntityUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        isMagistrateTypeGroup(typeGroup) &&
        type === MagistrateTransaction.ENTITY &&
        asset &&
        asset.action === MagistrateTransactionEntityAction.UPDATE
      );
    },

    isBusinessEntityRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityRegistration(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.BUSINESS
      );
    },

    isBusinessEntityResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityResignation(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.BUSINESS
      );
    },

    isBusinessEntityUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityUpdate(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.BUSINESS;
    },

    isProductEntityRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityRegistration(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.PRODUCT
      );
    },

    isProductEntityResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityResignation(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.PRODUCT;
    },

    isProductEntityUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityUpdate(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.PRODUCT;
    },

    isPluginEntityRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityRegistration(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.PLUGIN;
    },

    isPluginEntityResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityResignation(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.PLUGIN;
    },

    isPluginEntityUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityUpdate(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.PLUGIN;
    },

    isModuleEntityRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityRegistration(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.MODULE;
    },

    isModuleEntityResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityResignation(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.MODULE;
    },

    isModuleEntityUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityUpdate(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.MODULE;
    },

    isDelegateEntityRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityRegistration(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.DELEGATE
      );
    },

    isDelegateEntityResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityResignation(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.DELEGATE
      );
    },

    isDelegateEntityUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return this.isEntityUpdate(type, typeGroup, asset) && asset.type === MagistrateTransactionEntityType.DELEGATE;
    },

    // Magistrate 1.0

    isLegacyBusinessRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_REGISTRATION;
    },

    isLegacyBusinessResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_RESIGNATION;
    },

    isLegacyBusinessUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_UPDATE;
    },

    isLegacyBridgechainRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_REGISTRATION;
    },

    isLegacyBridgechainResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_RESIGNATION;
    },

    isLegacyBridgechainUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_UPDATE;
    },

    // Unknown type

    isUndefinedRegistration(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityRegistration(type, typeGroup, asset) &&
        !Object.values(MagistrateTransactionEntityType).includes(asset.type)
      );
    },

    isUndefinedResignation(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityResignation(type, typeGroup, asset) &&
        !Object.values(MagistrateTransactionEntityType).includes(asset.type)
      );
    },

    isUndefinedUpdate(type: number, typeGroup: number, asset: Record<string, any>): boolean {
      return (
        this.isEntityUpdate(type, typeGroup, asset) &&
        !Object.values(MagistrateTransactionEntityType).includes(asset.type)
      );
    },
  },
};
