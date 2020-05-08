<template>
  <Modal @close="emitClose">
    <section class="SettingsModal__container">
      <header class="SettingsModal__container__header">
        <h2 class="text-3xl mb-4">{{ $t("SETTINGS.MODAL.TITLE") }}</h2>
        <p class="semibold text-grey">{{ $t("SETTINGS.MODAL.DESCRIPTION") }}</p>
      </header>
    </section>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SettingsModal extends Vue {
  public emitClose() {
    this.$emit("close");
  }
}
</script>

<style scoped>
</style>
