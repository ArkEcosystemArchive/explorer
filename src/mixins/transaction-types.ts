import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";

export default {
  methods: {
    isTransfer(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.TRANSFER;
    },

    isSecondSignature(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.SECOND_SIGNATURE;
    },

    isDelegateRegistration(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.DELEGATE_REGISTRATION;
    },

    isVote(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.VOTE;
    },

    isMultiSignature(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.MULTI_SIGNATURE;
    },

    isIpfs(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.IPFS;
    },

    isDelegateResignation(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.DELEGATE_RESIGNATION;
    },

    isMultiPayment(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.MULTI_PAYMENT;
    },

    isTimelock(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.TIMELOCK;
    },

    isTimelockClaim(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.TIMELOCK_CLAIM;
    },

    isTimelockRefund(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.CORE && type === CoreTransaction.TIMELOCK_REFUND;
    },

    isBusinessRegistration(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.MAGISTRATE && type === MagistrateTransaction.BUSINESS_REGISTRATION;
    },

    isBusinessResignation(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.MAGISTRATE && type === MagistrateTransaction.BUSINESS_RESIGNATION;
    },

    isBusinessUpdate(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.MAGISTRATE && type === MagistrateTransaction.BUSINESS_UPDATE;
    },

    isBridgechainRegistration(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.MAGISTRATE && type === MagistrateTransaction.BRIDGECHAIN_REGISTRATION;
    },

    isBridgechainResignation(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.MAGISTRATE && type === MagistrateTransaction.BRIDGECHAIN_RESIGNATION;
    },

    isBridgechainUpdate(type: number, typeGroup: number): boolean {
      return typeGroup === TypeGroupTransaction.MAGISTRATE && type === MagistrateTransaction.BRIDGECHAIN_UPDATE;
    },
  },
};
