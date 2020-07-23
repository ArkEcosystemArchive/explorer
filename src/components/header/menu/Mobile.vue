<template>
  <ul class="block HeaderMenuMobile xl:hidden">
    <li
      v-for="entry in entries"
      :key="entry.name"
      class="HeaderMenuMobile__Entry"
      :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']"
    >
      <RouterLink :to="entry" tag="div" class="HeaderMenuMobile__Entry__Link">
        {{ $t(`PAGES.${normalizeName(entry.name)}.TITLE`) }}
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Location } from "vue-router";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class HeaderMenuMobile extends Vue {
  @Prop({ required: true }) public entries: Location[];
  @Inject("normalizeName") public normalizeName: (name: string) => string;

  private nightMode: boolean;
}
</script>

<style>
.HeaderMenuMobile {
  transform: translateY(100%);
  @apply .w-full .max-w-480px .bg-table-row .absolute .bottom-0 .left-0 .py-5;
}

.HeaderMenuMobile__Entry .HeaderMenuMobile__Entry__Link {
  @apply .cursor-pointer .py-5 .w-64 .flex-none .border-b .border-theme-nav-border;
}

.HeaderMenuMobile__Entry:last-of-type .HeaderMenuMobile__Entry__Link {
  @apply .border-none;
}
</style>
