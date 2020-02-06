import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import TransactionTypesMixin from "@/mixins/transaction-types";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums"
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

      expect(wrapper.vm.isBusinessRegistration(MagistrateTransaction.BUSINESS_REGISTRATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isBusinessResignation(MagistrateTransaction.BUSINESS_RESIGNATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isBusinessUpdate(MagistrateTransaction.BUSINESS_UPDATE, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isBridgechainRegistration(MagistrateTransaction.BRIDGECHAIN_REGISTRATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isBridgechainResignation(MagistrateTransaction.BRIDGECHAIN_RESIGNATION, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
      expect(wrapper.vm.isBridgechainUpdate(MagistrateTransaction.BRIDGECHAIN_UPDATE, TypeGroupTransaction.MAGISTRATE)).toEqual(true);
    });
  });
});
