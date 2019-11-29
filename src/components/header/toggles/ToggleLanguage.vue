<template>
  <button
    id="language-icon"
    class="text-language-icon px-2 py-3 hidden md:flex items-center text-sm border-b-2 mt-2px border-transparent hover:border-orange hover:text-orange transition"
    @click="$store.dispatch('ui/setHeaderType', isLanguagesMenu ? null : 'languages')"
  >
    <SvgIcon name="globe" view-box="0 0 22 22" />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("ui", ["headerType"]),
  },
})
export default class ToggleLanguage extends Vue {
  private headerType: string;

  get isLanguagesMenu() {
    return this.headerType === "languages";
  }
}
</script>
