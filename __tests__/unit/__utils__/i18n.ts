import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "../../../src/locales/en-GB";

const locale = "en-GB";

const useI18n = (vue: any) => {
  vue.use(VueI18n);

  return new VueI18n({
    silentTranslationWarn: true,
    locale,
    fallbackLocale: locale,
    messages: {
      [locale]: en,
      "it-IT": {
        COMMON: {
          NO_RESULTS: "Nessun risultato",
        },
      },
    },
  });
};

const useI18nGlobally = () => {
  return useI18n(Vue);
};

export { locale, useI18n, useI18nGlobally };
export default useI18nGlobally;
