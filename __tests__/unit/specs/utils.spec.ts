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
      const delegates = await DelegateService.fetchEveryDelegate();
      store.dispatch("network/setEpoch", node.constants.epoch);
      store.dispatch("delegates/setDelegates", {
        delegates,
        timestamp: Math.floor(Date.now() / 1000),
      });
    });

    it("should convert the input to an arktoshi amount", async () => {
      const { value } = await inputProcessor("fee", "1");
      expect(value).toBe(100000000);
    });

    it("should return the public key of a username", async () => {
      const { value } = await inputProcessor("vote", "biz_classic");
      expect(value).toBe("020431436cf94f3c6a6ba566fe9e42678db8486590c732ca6c3803a10a86f50b92");
    });

    it("should return the network timestamp of a date", async () => {
      const { value } = await inputProcessor("timestamp-from", "2019-12-24T15:19:37.000Z");
      expect(value).toBe(87099577);
    });

    it("should return a timestamp", async () => {
      const { ts } = await inputProcessor("fee", "1");
      expect(typeof ts).toBe("number");
    });
  });
});
