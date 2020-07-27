<template>
  <div class="HeaderMenuDesktop md:px-8 sm:flex xl:rounded-r-md">
    <button
      class="flex items-center flex-none px-4 py-3 mr-3 border-b-2 border-transparent md:py-6 mt-2px hover:border-theme-accents text-theme-text-secondary"
      @click="closeMenu"
    >
      <SvgIcon class="flex-none" name="menu" view-box="0 0 15 13" />
    </button>

    <RouterLink
      v-for="entry in entries"
      :key="entry.name"
      :to="entry"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t(`PAGES.${normalizeName(entry.name)}.TITLE`) }}
    </RouterLink>

    <div class="flex-auto" />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Location } from "vue-router";

@Component({})
export default class HeaderMenuDesktop extends Vue {
  @Prop({ required: true }) public entries: Location[];
  @Inject("normalizeName") public normalizeName: (name: string) => string;

  private closeMenu(): void {
    this.$store.dispatch("ui/setMenuVisible", false);
  }
}
</script>

<style>
.HeaderMenuDesktop {
  @apply .absolute .inset-0 .px-4 .bg-theme-nav-background;
}
</style>
