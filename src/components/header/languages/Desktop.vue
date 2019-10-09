<template>
  <div class="language-menu w-full px-5 hidden xl:flex items-center justify-end">
    <button v-for="lang in languages" :key="lang" class="menu-button" @click="setLanguage(lang)">
      <SvgIcon class="flag-image" :name="`flags/${lang}`" view-box="0 0 20 20" />
    </button>

    <button
      class="flex flex-none p-2 text-theme-button-close close-button"
      @click="$store.dispatch('ui/setHeaderType', null)"
    >
      <SvgIcon name="cross" view-box="0 0 14 14" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
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
}
</script>

<style scoped>
.close-button {
  margin-left: 0.825rem;
}
</style>
