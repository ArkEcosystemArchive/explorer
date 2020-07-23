<template>
  <Modal v-if="showModal" :close-outside="false" :show-cancel="false">
    <div class="text-justify" style="max-width: 450px;">
      <p class="mb-4 text-3xl text-center semibold">
        {{ $t("DISCLAIMER.TITLE") }}
      </p>
      <i18n path="DISCLAIMER.TEXT1" tag="p">
        <template v-slot:website>
          <a href="https://ark.io/" target="_blank">ARK.io</a>
        </template>
      </i18n>
      <p class="mt-3">{{ $t("DISCLAIMER.TEXT2") }}</p>
      <div class="flex justify-center">
        <button class="mx-0 mt-5 mr-10 button-lg" @click="acceptTerms()">{{ $t("COMMON.ACCEPT") }}</button>
        <RouterLink :to="{ name: 'home' }" tag="button" class="mt-5 text-theme-text-secondary hover:underline">
          {{ $t("COMMON.CANCEL") }}
        </RouterLink>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DisclaimerModal extends Vue {
  private showModal = false;

  public mounted() {
    this.$store.getters["ui/hasAcceptedLinkDisclaimer"] ? (this.showModal = false) : (this.showModal = true);
  }

  private acceptTerms() {
    this.$store.dispatch("ui/setHasAcceptedLinkDisclaimer", true);
    this.showModal = false;
  }
}
</script>
