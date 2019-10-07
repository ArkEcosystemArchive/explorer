import useI18nGlobally from "../../__utils__/i18n";

const i18n = useI18nGlobally();

describe("i18n", () => {
  it("should return a translation for a given phrase", () => {
    expect(i18n.t("COMMON.NO_RESULTS")).toBe("No results");
  });

  it("should be possible to switch languages", () => {
    expect(i18n.t("COMMON.NO_RESULTS", "it-IT")).toBe("Nessun risultato");
  });
});
