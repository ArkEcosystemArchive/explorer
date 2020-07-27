<template>
  <footer class="flex-col px-5 AppFooter md:px-10 lg:flex-row">
    <div class="mb-4 text-center lg:mb-0 md:text-left">
      <span class="block mb-4 text-center md:inline-block md:mb-0"
        >&copy; <a :href="brandData.footer.url" target="_blank">{{ brandData.footer.text }}</a> | {{ year }}.
        {{ $t("FOOTER.ALL_RIGHTS_RESERVED") }}</span
      >
      <div class="block md:inline-block">
        <span class="hidden px-1 md:inline-block">|</span>
        <span
          >{{ $t("FOOTER.VERSION") }}: <a :href="versionLink" target="_blank">{{ version }}</a> |
          {{ $t("FOOTER.DATE") }}: {{ date }}</span
        >
      </div>
    </div>
    <div class="text-center">
      <a v-for="social in socialMediaData" :key="social.name" :href="social.url" target="_blank">
        <SvgIcon class="m-1" :name="`social/${social.name}`" :view-box="social.viewBox" />
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { brand, socialMedia } from "@/config";
import moment from "moment";

@Component
export default class AppFooter extends Vue {
  get year() {
    return moment().format("Y");
  }

  get version() {
    return process.env.VUE_APP_GIT_VERSION;
  }

  get versionLink() {
    return `https://github.com/ArkEcosystem/explorer/commit/${process.env.VUE_APP_GIT_VERSION}`;
  }

  get date() {
    return process.env.VUE_APP_GIT_DATE;
  }

  get brandData() {
    return brand;
  }

  get socialMediaData() {
    return socialMedia;
  }
}
</script>

<style>
.AppFooter {
  @apply .flex .flex-wrap .max-w-2xl .mx-auto .py-8 .text-theme-text-tertiary .justify-between .items-center;
}

.AppFooter svg {
  @apply .inline;
}
</style>
