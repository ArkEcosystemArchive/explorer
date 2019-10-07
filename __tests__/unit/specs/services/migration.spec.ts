import MigrationService from "@/services/migration";

const VUE_APP_EXPLORER_CONFIG = "devnet";

describe("Services > Migration", () => {
  describe("priceChart", () => {
    beforeEach(() => {
      process.env = Object.assign(process.env, { VUE_APP_EXPLORER_CONFIG });
      localStorage.clear();
    });

    it("should execute the migration if priceChart is set", () => {
      localStorage.setItem("priceChart", "true");

      MigrationService.priceChart();

      expect(localStorage.getItem).toHaveBeenCalledWith("priceChart");
      expect(localStorage.getItem).toHaveBeenCalledWith("priceChartPeriod");

      expect(localStorage.setItem).toHaveBeenCalled();
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
      expect(localStorage.__STORE__.priceChartOptions).toBe(
        JSON.stringify({
          enabled: true,
          period: "day",
          type: "price",
        }),
      );

      expect(localStorage.removeItem).toHaveBeenCalledWith("priceChart");
      expect(localStorage.removeItem).toHaveBeenCalledWith("priceChartPeriod");
    });

    it("should execute the migration if priceChartPeriod is set", () => {
      localStorage.setItem("priceChartPeriod", "testPeriod");

      MigrationService.priceChart();

      expect(localStorage.getItem).toHaveBeenCalledWith("priceChart");
      expect(localStorage.getItem).toHaveBeenCalledWith("priceChartPeriod");

      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.__STORE__.priceChartOptions).toBe(
        JSON.stringify({
          enabled: false,
          period: "testPeriod",
          type: "price",
        }),
      );

      expect(localStorage.removeItem).toHaveBeenCalledWith("priceChart");
      expect(localStorage.removeItem).toHaveBeenCalledWith("priceChartPeriod");
    });

    it("should not execute the migration if neither priceChart nor priceChartPeriod is set", () => {
      MigrationService.priceChart();

      expect(localStorage.__STORE__.priceChart).toBeFalsy();
      expect(localStorage.__STORE__.priceChartPeriod).toBeFalsy();

      expect(localStorage.__STORE__).toEqual({});
    });
  });
});
