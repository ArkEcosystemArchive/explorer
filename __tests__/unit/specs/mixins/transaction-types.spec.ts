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
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isBusinessEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.BUSINESS,
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isBusinessEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.BUSINESS,
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isDeveloperEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DEVELOPER,
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isDeveloperEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DEVELOPER,
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isDeveloperEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DEVELOPER,
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isCorePluginEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        subType: MagistrateTransactionEntitySubType.PLUGIN_CORE,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isCorePluginEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        subType: MagistrateTransactionEntitySubType.PLUGIN_CORE,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isCorePluginEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        subType: MagistrateTransactionEntitySubType.PLUGIN_CORE,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isDesktopPluginEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        subType: MagistrateTransactionEntitySubType.PLUGIN_DESKTOP,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isDesktopPluginEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        subType: MagistrateTransactionEntitySubType.PLUGIN_DESKTOP,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isDesktopPluginEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.PLUGIN,
        subType: MagistrateTransactionEntitySubType.PLUGIN_DESKTOP,
        action: MagistrateTransactionEntityAction.UPDATE,
      })).toEqual(true);

      expect(wrapper.vm.isDelegateEntityRegistration(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DELEGATE,
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.REGISTER,
      })).toEqual(true);

      expect(wrapper.vm.isDelegateEntityResignation(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DELEGATE,
        subType: MagistrateTransactionEntitySubType.NONE,
        action: MagistrateTransactionEntityAction.RESIGN,
      })).toEqual(true);

      expect(wrapper.vm.isDelegateEntityUpdate(MagistrateTransaction.ENTITY, TypeGroupTransaction.MAGISTRATE, {
        type: MagistrateTransactionEntityType.DELEGATE,
        subType: MagistrateTransactionEntitySubType.NONE,
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
