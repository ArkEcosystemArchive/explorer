import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction, NftTransaction, UNSTransaction } from "@/enums";

const isCoreTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.CORE;
};

const isMagistrateTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.MAGISTRATE;
};

const isNFTTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.NFT;
};

const isUNSTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.UNS;
};

export default {
  methods: {
    isTransfer(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TRANSFER;
    },

    isSecondSignature(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.SECOND_SIGNATURE;
    },

    isDelegateRegistration(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_REGISTRATION;
    },

    isVote(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.VOTE;
    },

    isMultiSignature(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_SIGNATURE;
    },

    isIpfs(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.IPFS;
    },

    isDelegateResignation(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_RESIGNATION;
    },

    isMultiPayment(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_PAYMENT;
    },

    isTimelock(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK;
    },

    isTimelockClaim(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_CLAIM;
    },

    isTimelockRefund(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_REFUND;
    },

    isBusinessRegistration(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_REGISTRATION;
    },

    isBusinessResignation(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_RESIGNATION;
    },

    isBusinessUpdate(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_UPDATE;
    },

    isBridgechainRegistration(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_REGISTRATION;
    },

    isBridgechainResignation(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_RESIGNATION;
    },

    isBridgechainUpdate(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_UPDATE;
    },

    isNftMint(type: number, typeGroup: number): boolean {
      return isNFTTypeGroup(typeGroup) && type === NftTransaction.NFT_MINT;
    },

    isNftTransfer(type: number, typeGroup: number): boolean {
      return isNFTTypeGroup(typeGroup) && type === NftTransaction.NFT_TRANSFER;
    },

    isNftUpdate(type: number, typeGroup: number): boolean {
      return isNFTTypeGroup(typeGroup) && type === NftTransaction.NFT_UPDATE;
    },

    isUnsDiscloseExplicit(type: number, typeGroup: number): boolean {
      return isUNSTypeGroup(typeGroup) && type === UNSTransaction.DISCLOSE_EXPLICIT;
    },
  },
};
