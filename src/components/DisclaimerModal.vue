<template>
  <Modal v-if="showModal" :close-outside="false" :show-cancel="false">
    <div class="text-justify" style="max-width: 450px;">
      <p class="text-center semibold text-3xl mb-4">
        {{ $t("DISCLAIMER.TITLE") }}
      </p>
      <i18n path="DISCLAIMER.TEXT1" tag="p">
        <template v-slot:website>
          <a href="https://ark.io/" target="_blank">ARK.io</a>
        </template>
      </i18n>
      <p class="mt-3">{{ $t("DISCLAIMER.TEXT2") }}</p>
      <div class="flex justify-center">
        <button class="button-lg mt-5 mr-10 mx-0" @click="acceptTerms()">{{ $t("COMMON.ACCEPT") }}</button>
        <RouterLink :to="{ name: 'home' }" tag="button" class="text-theme-text-secondary mt-5 hover:underline">
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
