import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import TransactionTypesMixin from "@/mixins/transaction-types";
import { CoreTransaction, MagistrateTransaction, MagistrateTransactionEntityType, MagistrateTransactionEntitySubType, MagistrateTransactionEntityAction, TypeGroupTransaction } from "@/enums"
import Vue from "vue";

describe("Mixins > Transaction Types", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    const localVue = createLocalVue();

    const TestComponent = {
      name: "TestComponent",
      template: "<div />",
    };

    wrapper = shallowMount(TestComponent, {
      localVue,
      mixins: [TransactionTypesMixin],
    });
  });

  describe("is[Type]", () => {
    it("should return true for the correct types", () => {
      expect(wrapper.vm.isTransfer(CoreTransaction.TRANSFER, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isSecondSignature(CoreTransaction.SECOND_SIGNATURE, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isDelegateRegistration(CoreTransaction.DELEGATE_REGISTRATION, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isVote(CoreTransaction.VOTE, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isMultiSignature(CoreTransaction.MULTI_SIGNATURE, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isIpfs(CoreTransaction.IPFS, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isDelegateResignation(CoreTransaction.DELEGATE_RESIGNATION, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isMultiPayment(CoreTransaction.MULTI_PAYMENT, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isTimelock(CoreTransaction.TIMELOCK, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isTimelockClaim(CoreTransaction.TIMELOCK_CLAIM, TypeGroupTransaction.CORE)).toEqual(true);
      expect(wrapper.vm.isTimelockRefund(CoreTransaction.TIMELOCK_REFUND, TypeGroupTransaction.CORE)).toEqual(true);

      expect(wrapper.vm.isEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isBusinessEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.BUSINESS,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isBusinessEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.BUSINESS,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isBusinessEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.BUSINESS,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isProductEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PRODUCT,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isProductEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PRODUCT,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isProductEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PRODUCT,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isPluginEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isPluginEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isPluginEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isModuleEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.MODULE,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isModuleEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.MODULE,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isModuleEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.MODULE,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isDelegateEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DELEGATE,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isDelegateEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DELEGATE,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isDelegateEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DELEGATE,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isLegacyBusinessRegistration(MagistrateTransaction.BUSINESS_REGISTRATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isLegacyBusinessResignation(MagistrateTransaction.BUSINESS_RESIGNATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isLegacyBusinessUpdate(MagistrateTransaction.BUSINESS_UPDATE, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isLegacyBridgechainRegistration(MagistrateTransaction.BRIDGECHAIN_REGISTRATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isLegacyBridgechainResignation(MagistrateTransaction.BRIDGECHAIN_RESIGNATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isLegacyBridgechainUpdate(MagistrateTransaction.BRIDGECHAIN_UPDATE, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
    });
  });
});
