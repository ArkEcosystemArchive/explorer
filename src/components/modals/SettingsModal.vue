<template>
  <Modal @close="emitClose">
    <div class="SettingsModal">
      <section class="SettingsModal__container">
        <header class="SettingsModal__container__header">
          <h2 class="text-3xl mb-4">{{ $t("MODAL_SETTINGS.TITLE") }}</h2>
          <p class="semibold text-grey">{{ $t("MODAL_SETTINGS.DESCRIPTION") }}</p>
        </header>

        <ListDivided>
          <ListDividedItem
            :label="$t('MODAL_SETTINGS.CURRENCY.LABEL')"
            :label-description="$t('MODAL_SETTINGS.CURRENCY.DESCRIPTION')"
          >
            <button>ARK/USD</button>
          </ListDividedItem>
          <ListDividedItem
            :label="$t('MODAL_SETTINGS.SMARTBRIDGE_SETTING.LABEL')"
            :label-description="$t('MODAL_SETTINGS.SMARTBRIDGE_SETTING.DESCRIPTION')"
          >
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
