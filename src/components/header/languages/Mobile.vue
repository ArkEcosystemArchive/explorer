<template>
  <ul
    class="language-menu menu-container text-center max-w-480px justify-center bg-table-row absolute bottom-0 right-0 py-1 px-4 items-center hidden md:flex xl:hidden"
  >
    <li
      v-for="lang in languages"
      :key="lang"
      :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'inline-flex justify-center']"
      @click="setLanguage(lang)"
    >
      <a href="#" class="cursor-pointer py-3 px-3 w-20 flex-none">
        <SvgIcon class="flag-image" :name="`flags/${lang}`" view-box="0 0 20 20" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { I18N } from "@/config";
import moment from "moment";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode", "language"]),
  },
})
export default class HeaderLanguagesMobile extends Vue {
  private nightMode: boolean;
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

<style>
.menu-container {
  transform: translateY(100%);
}
</style>
