import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import MiscMixin from "@/mixins/misc";
import store from "@/store";
import moment from "moment-timezone";
import Vue from "vue";

describe("Mixins > Misc", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    const localVue = createLocalVue();

    const TestComponent = {
      name: "TestComponent",
      template: "<div />",
    };

    wrapper = shallowMount(TestComponent, {
      localVue,
      store,
      mixins: [MiscMixin],
    });
  });

  describe("readableTimestamp", () => {
    it("should properly format the given data", () => {
      const result = moment()
        .utc()
        .set({
          year: 2017,
          month: 11,
          date: 3,
          hour: 20,
          minute: 31,
          second: 40,
        })
        .local();

      expect(wrapper.vm.readableTimestamp(1512333100)).toEqual(result.format("L LTS"));
    });
  });

  describe("readableTimestamp", () => {
    it("should properly format the given data", () => {
      expect(wrapper.vm.readableTimestampAgo(22231900, 26231900)).toEqual("2 months ago");
    });
  });

  describe("readableNumber", () => {
    it("should properly format the given data", () => {
      expect(wrapper.vm.readableNumber(1)).toEqual("1");
      expect(wrapper.vm.readableNumber(10)).toEqual("10");
      expect(wrapper.vm.readableNumber(100)).toEqual("100");
      expect(wrapper.vm.readableNumber(1000, 2, true)).toEqual("1000.00");
      expect(wrapper.vm.readableNumber(1234.56789, 2, true)).toEqual("1234.57");
    });

    it("should format to the specified decimals", () => {
      expect(wrapper.vm.readableNumber(1, 3)).toEqual("1.000");
      expect(wrapper.vm.readableNumber(1.23456, 3)).toEqual("1.235");
      expect(wrapper.vm.readableNumber(100, 8)).toEqual("100.00000000");
    });
  });

  describe("readableTimestampFromBlockheight", () => {
    store.dispatch("network/setBlocktime", 10);
    store.dispatch("network/setHeight", 10);
    it("should return a readable timestamp", () => {
      expect(wrapper.vm.readableTimestampFromBlockheight(20)).toEqual(moment().add(10 * 10, "seconds").local().format("L LTS"));
    });
  });

  describe("readableTimestampFromOffset", () => {
    it("should return a readable timestamp from a specified offset", () => {
      expect(wrapper.vm.readableTimestampFromOffset(1476668663, 1000000)).toEqual(moment.unix(1476668663 + 1000000).local().format("L LTS"));
    });
  });

  describe("readableTimestampFromEpoch", () => {
    store.dispatch("network/setEpoch", 1490101200);
    it("should return a readable timestamp from epoch", () => {
      const epoch = moment(1490101200).unix();
      expect(wrapper.vm.readableTimestampFromEpoch(10000000)).toEqual(moment.unix(epoch + 10000000).local().format("L LTS"));
    });
  });

  describe("calculateMultipaymentAmount", () => {
    let transaction = {
      senderId: "A2",
      asset: {
        payments: [
          {
            recipientId: "A1",
            amount: "100",
          },
          {
            recipientId: "A1",
            amount: "100",
          },
          {
            recipientId: "A2",
            amount: "100",
          },
          {
            recipientId: "A3",
            amount: "100",
          }
        ],
      },
    };

    it("should return the correct amount if no address given", () => {
      expect(wrapper.vm.calculateMultipaymentAmount(transaction).toFixed()).toEqual("400");
    });

    it("should return the correct amount if there is only one payment to the given address", () => {
      expect(wrapper.vm.calculateMultipaymentAmount(transaction, "A3").toFixed()).toEqual("100");
    });

    it("should return the correct amount if there are multiple payments to the given address", () => {
      expect(wrapper.vm.calculateMultipaymentAmount(transaction, "A1").toFixed()).toEqual("200");
    });

    it("should return the correct amount for type `all`", () => {
      expect(wrapper.vm.calculateMultipaymentAmount(transaction, "A2", "all").toFixed()).toEqual("100");
    });

    it("should return the correct amount for type `received`", () => {
      expect(wrapper.vm.calculateMultipaymentAmount(transaction, "A2", "received").toFixed()).toEqual("100");
    });

    it("should return the correct amount for type `sent`", () => {
      expect(wrapper.vm.calculateMultipaymentAmount(transaction, "A2", "sent").toFixed()).toEqual("400");
    });

    it("should return 0 if no asset given", () => {
      expect(wrapper.vm.calculateMultipaymentAmount({}, "A2", "sent").toFixed()).toEqual("0");
    });
  });
});
