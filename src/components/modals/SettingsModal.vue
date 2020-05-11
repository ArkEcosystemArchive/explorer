<template>
  <Modal @close="emitClose">
    <div class="SettingsModal">
      <div class="SettingsModal__header">
        <h2 class="text-3xl mb-4">{{ $t("MODAL_SETTINGS.TITLE") }}</h2>
        <p class="semibold text-grey mb-6">{{ $t("MODAL_SETTINGS.DESCRIPTION") }}</p>
      </div>

      <div class="SettingsModal__content">
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
      </div>

      <div class="SettingsModal__footer flex flex-row mt-5">
        <button class="pager-button mr-3">
          {{ $t("COMMON.CANCEL") }}
        </button>
        <button class="action-button py-4 px-8">
          {{ $t("COMMON.SAVE") }}
        </button>
      </div>
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
