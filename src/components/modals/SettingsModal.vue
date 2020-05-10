<template>
  <Modal @close="emitClose">
    <div class="SettingsModal">
      <section class="SettingsModal__container">
        <header class="SettingsModal__container__header">
          <h2 class="text-3xl mb-4">{{ $t("SETTINGS.MODAL.TITLE") }}</h2>
          <p class="semibold text-grey">{{ $t("SETTINGS.MODAL.DESCRIPTION") }}</p>
        </header>

        <ListDivided>
          <ListDividedItem label="Currency">
            <button>ARK/USD</button>
          </ListDividedItem>
          <ListDividedItem label="Currency" label-description="Choose which currency you want to equate the price of the ARK token with">
            <button>ARK/USD</button>
          </ListDividedItem>
        </ListDivided>
      </section>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ListDivided, ListDividedItem } from "@/components/utils/listDivided";

@Component({
  components: {
    ListDivided,
    ListDividedItem,
  },
})
export default class SettingsModal extends Vue {
  public emitClose() {
    this.$emit("close");
  }
}
</script>

<style>
.SettingsModal .ListDividedItem__container__label {
  @apply .mr-10;
}
.SettingsModal .ListDividedItem__label__description {
  @apply .max-w-xs;
}
</style>
