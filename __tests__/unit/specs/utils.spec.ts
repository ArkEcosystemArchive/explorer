import { roundFromHeight } from "@/utils";

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
});
