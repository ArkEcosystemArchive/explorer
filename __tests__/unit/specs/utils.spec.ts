import { roundFromHeight, inputProcessor } from "@/utils";
import DelegateService from "@/services/delegate";
import NodeService from "@/services/node";
import store from "@/store";

describe("Utils", () => {
  describe("roundFromHeight", () => {
    it("should return the correct round", () => {
      expect(roundFromHeight(4781111)).toBe(93747 + 1);
    });

    it("should return the correct round, when modulo is 0", () => {
      expect(roundFromHeight(4781097)).toBe(93747);
    });

    it("should return 0 when given round is not a number", () => {
      expect(roundFromHeight("a")).toBe(0);
    });
  });

  describe("inputProcessor", () => {
    beforeAll(async () => {
      store.dispatch("network/setServer", "https://explorer.ark.io/api");
      const node = await NodeService.config();
      const delegates = await DelegateService.all();
      store.dispatch("network/setEpoch", node.constants.epoch);
      store.dispatch("delegates/setDelegates", {
        delegates,
        timestamp: Math.floor(Date.now() / 1000),
      });
    });

    it("should convert the input to an arktoshi amount", () => {
      expect(inputProcessor("fee", "1")).toBe(100000000);
    });

    it("should return the public key of a username", () => {
      expect(inputProcessor("vote", "biz_classic")).toBe(
        "020431436cf94f3c6a6ba566fe9e42678db8486590c732ca6c3803a10a86f50b92",
      );
    });

    it("should return the network timestamp of a date", () => {
      expect(inputProcessor("timestamp-from", "2019-12-24T15:19:37.000Z")).toBe(87099577);
    });
  });
});
