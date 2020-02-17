<template>
  <div v-show="isVisible" class="Pagination__Input">
    <input
      v-model.trim="query"
      v-tooltip="{
        show: hasError,
        content: $t('PAGINATION.NO_RESULTS'),
        trigger: 'manual',
        placement: 'bottom-start',
        classes: 'search-tip',
      }"
      :placeholder="placeholder"
      :class="{ 'text-grey': nightMode }"
      class="search-input"
      type="number"
      min="1"
      step="1"
      @keyup.enter="search"
    />

    <button :disabled="!hasInput" class="control-button text-theme-button-close" @click="search">
      <SvgIcon name="search" view-box="0 0 13 13" />
    </button>

    <button class="control-button text-theme-button-close" @click="emitClose">
      <SvgIcon name="cross" view-box="0 0 13 13" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { LocaleMessage } from "vue-i18n";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class PaginationPageInput extends Vue {
  @Prop({ required: true }) public isVisible: boolean;
  @Prop({ required: true }) public pageCount: number;
  @Prop({ required: true }) public isMobile: boolean;

  private query: string | null = null;
  private placeholder: LocaleMessage | null = null;
  private hasError = false;
  private nightMode: boolean;

  get hasInput() {
    return !!this.query;
  }

  @Watch("isMobile")
  public onIsMobileChanged(showMobile: boolean) {
    this.setPlaceholder(showMobile);
  }

  public mounted() {
    this.setPlaceholder(this.isMobile);
  }

  private search() {
    if (!this.query) {
      return;
    }

    const pageNumber = parseInt(this.query, 10);

    if (!pageNumber || pageNumber < 1 || pageNumber > this.pageCount) {
      this.hasError = true;
      setTimeout(() => (this.hasError = false), 1500);
    } else {
      this.emitPageChange(pageNumber);
    }
  }

  private setPlaceholder(showMobile: boolean) {
    this.placeholder = showMobile
      ? this.$i18n.t("PAGINATION.PLACEHOLDER.SHORT")
      : this.$i18n.t("PAGINATION.PLACEHOLDER.LONG");
  }

  private emitPageChange(page: number) {
    this.$emit("page-change", page);
  }

  private emitClose() {
    this.$emit("close");
  }
}
</script>

<style>
.Pagination__Input {
  @apply .flex .items-center .absolute .inset-0 .z-10 .bg-theme-button .px-3 .rounded;
}

.Pagination__Input input[type="number"]::-webkit-inner-spin-button,
.Pagination__Input input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

.control-button {
  @apply .flex .flex-none .p-2;
}

.control-button:disabled {
  @apply .cursor-default;
}

.search-input {
  @apply .w-full .flex-auto .bg-transparent .p-2;
}

.search-input::placeholder {
  color: var(--color-theme-text-placeholder);
}
</style>
