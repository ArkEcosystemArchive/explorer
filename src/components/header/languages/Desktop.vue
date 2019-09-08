<template>
  <div class="language-menu w-full px-5 hidden xl:flex items-center justify-end">
    <button v-for="lang in languages" :key="lang" class="menu-button" @click="setLanguage(lang)">
      <img :src="getLanguageFlag(lang)" class="flag-image" />
    </button>

    <button class="flex flex-none p-2 close-button" @click="$store.dispatch('ui/setHeaderType', null)">
      <img src="@/assets/images/icons/cross.svg" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
// @ts-ignore
import { I18N } from "@/config";
import moment from "moment";

@Component({
  computed: {
    ...mapGetters("ui", ["language"]),
  },
})
export default class HeaderLanguagesDesktop extends Vue {
  private language: string;

  get languages() {
    return I18N.enabledLocales.filter((locale: string) => locale !== this.language);
  }

  private setLanguage(language: string) {
    this.$store.dispatch("ui/setLanguage", language);
    this.$i18n.locale = language;

    this.$store.dispatch("ui/setLocale", language);
    moment.locale(language);

    this.$store.dispatch("ui/setHeaderType", null);
  }

  private getLanguageFlag(language: string) {
    // TODO: consider using flag plugin, for example `flag-icon-css`
    try {
      return require(`@/assets/images/flags/${language}.svg`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
</script>

<style scoped>
.close-button {
  margin-left: 0.825rem;
}
</style>
