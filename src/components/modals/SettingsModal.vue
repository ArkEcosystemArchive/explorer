<template>
  <Modal @close="emitClose">
    <section class="SettingsModal__container">
      <header>
        <h2>{{ $t("SETTINGS.MODAL.TITLE") }}</h2>
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
