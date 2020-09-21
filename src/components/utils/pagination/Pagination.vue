<template>
  <div v-click-outside="closePageInput" class="mx-5 mt-5 Pagination sm:mx-10 md:mt-10">
    <div class="relative PaginationBar--small">
      <PaginationPageInput
        :is-visible="showPageInput"
        :page-count="pageCount"
        :is-mobile="isMobile"
        class="Pagination__Input"
        @page-change="emitPageChange"
        @close="closePageInput"
      />

      <PaginationSearchButton
        :class="{ 'opacity-0': showPageInput }"
        class="justify-center w-full"
        :hover-scale="false"
        @click="openPageInput"
      >
        {{ $t("PAGINATION.PAGE") }} {{ currentPage }} {{ $t("PAGINATION.OF") }} {{ pageCount }}
      </PaginationSearchButton>
    </div>

    <div class="flex justify-center">
      <PaginationNavigationButton :is-visible="showFirst" type="first" class="mr-2" @click="emitFirst" />

      <PaginationNavigationButton
        :is-visible="showPrevious"
        type="previous"
        :class="{ 'no-margin': !showNext }"
        class="mr-2"
        @click="emitPrevious"
      />

      <div class="relative PaginationBar--large">
        <PaginationPageInput
          :is-visible="showPageInput"
          :page-count="pageCount"
          :is-mobile="isMobile"
          class="Pagination__Input"
          @page-change="emitPageChange"
          @close="closePageInput"
        />

        <div :class="{ 'opacity-0': showPageInput }" class="hidden px-3 rounded md:flex bg-theme-button">
          <PaginationSearchButton :is-visible="pageButtons[0] !== 1" @click="openPageInput" />

          <button
            v-for="page in pageButtons"
            :key="page"
            :disabled="page === currentPage"
            :class="{ active: page === currentPage }"
            class="transition Pagination__Button"
            @click="emitPageChange(page)"
          >
            <span>{{ page }}</span>
          </button>

          <PaginationSearchButton
            :is-visible="pageButtons[pageButtons.length - 1] !== pageCount"
            @click="openPageInput"
          />
        </div>

        <div class="flex rounded md:hidden bg-theme-button">
          <PaginationSearchButton :hover-scale="false" :class="{ 'opacity-0': showPageInput }" @click="openPageInput">
            {{ $t("PAGINATION.PAGE") }} {{ currentPage }} {{ $t("PAGINATION.OF") }} {{ pageCount }}
          </PaginationSearchButton>
        </div>
      </div>

      <PaginationNavigationButton
        :is-visible="showNext"
        type="next"
        :class="{ 'no-margin': !showPrevious }"
        class="ml-2"
        @click="emitNext"
      />

      <PaginationNavigationButton :is-visible="showLast" type="last" class="ml-2" @click="emitLast" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IMeta } from "@/interfaces";
import { PaginationNavigationButton, PaginationPageInput, PaginationSearchButton } from "@/components/utils/pagination";

@Component({
  components: {
    PaginationNavigationButton,
    PaginationPageInput,
    PaginationSearchButton,
  },
})
export default class Pagination extends Vue {
  @Prop({ required: true }) public meta: IMeta;
  @Prop({ required: true }) public currentPage: number;

  private pageInputVisible = false;
  private mobileView = false;

  get showPageInput() {
    return this.pageInputVisible;
  }

  get buttonCount() {
    return this.currentPage < 100 ? 7 : 5;
  }

  get pageCount() {
    return this.meta.pageCount;
  }

  get next() {
    return this.meta.next;
  }

  get previous() {
    return this.meta.previous;
  }

  get self() {
    return this.meta.self;
  }

  get first() {
    return this.meta.first;
  }

  get last() {
    return this.meta.last;
  }

  get showFirst() {
    return (
      (this.first !== this.previous && !this.pageButtons.includes(1)) || (this.first !== this.self && this.isMobile)
    );
  }

  get showPrevious() {
    return this.currentPage > 1;
  }

  get showNext() {
    return this.currentPage < this.pageCount;
  }

  get showLast() {
    return (
      (this.last !== this.next && !this.pageButtons.includes(this.pageCount)) ||
      (this.last !== this.self && this.isMobile)
    );
  }

  get subRangeLength() {
    return Math.floor(this.buttonCount / 2);
  }

  get pageButtons() {
    let buttons;

    if (this.pageCount <= this.buttonCount) {
      buttons = Array.apply(null, Array(this.pageCount)).map((_, i) => i + 1);
    } else if (this.currentPage <= this.subRangeLength + 1) {
      buttons = Array.apply(null, Array(this.buttonCount)).map((_, i) => i + 1);
    } else if (this.currentPage >= this.pageCount - this.subRangeLength) {
      buttons = Array.apply(null, Array(this.buttonCount)).map((_, i) => {
        return this.pageCount - this.buttonCount + i + 1;
      });
    } else {
      buttons = Array.apply(null, Array(this.buttonCount)).map((_, i) => {
        return this.currentPage - this.subRangeLength + i;
      });
    }

    return buttons;
  }

  get isMobile() {
    return this.mobileView;
  }

  public mounted() {
    const WIDTH_THRESHOLD = 768;
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`);

    widthQuery.addListener((e) => this.setMobileView(e.matches));

    this.setMobileView(window.innerWidth < WIDTH_THRESHOLD);
  }

  private emitFirst() {
    this.emitPageChange(1);
  }

  private emitPrevious() {
    this.emitPageChange(this.currentPage - 1);
  }

  private emitNext() {
    this.emitPageChange(this.currentPage + 1);
  }

  private emitLast() {
    this.emitPageChange(this.pageCount);
  }

  private emitPageChange(page: number) {
    this.$emit("page-change", page);
  }

  private openPageInput() {
    this.pageInputVisible = true;
  }

  private closePageInput() {
    this.pageInputVisible = false;
  }

  private setMobileView(isMobile: boolean) {
    this.mobileView = !!isMobile;
  }
}
</script>

<style>
.Pagination {
  @apply .flex .flex-col .flex-no-wrap .justify-center;
}

.Pagination__Button {
  @apply .text-theme-button-text .p-3 .cursor-pointer .flex .flex-no-wrap .items-center;
}

button[class*="Pagination__Button--"] {
  @apply .flex-1;
}

.Pagination__Button.active {
  @apply .bg-theme-button-active .text-theme-button-text;
}

.Pagination__Button:not(:disabled):hover {
  @apply .bg-blue .text-white .rounded;
  box-shadow: 0 5px 15px rgba(9, 100, 228, 0.34);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.Pagination__Button:disabled {
  @apply .text-theme-button-text;
}

.PaginationBar--small {
  @apply .hidden .bg-theme-button .rounded .mb-2;
}

.PaginationBar--small {
  @apply .flex;
}

.PaginationBar--large {
  @apply .hidden;
}

@media (max-width: 449px) {
  .Pagination__Button--previous {
    @apply .mr-1;
  }

  .Pagination__Button--next {
    @apply .ml-1;
  }

  button[class*="Pagination__Button--"].no-margin {
    @apply .mx-0;
  }
}

@media (min-width: 450px) {
  button[class*="Pagination__Button--"] {
    @apply .flex-none;
  }

  .PaginationBar--small {
    @apply .hidden;
  }

  .PaginationBar--large {
    @apply .flex;
  }
}
</style>
