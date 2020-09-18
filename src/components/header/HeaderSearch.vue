<template>
  <div class="px-5 HeaderSearch sm:px-10">
    <button class="flex flex-none p-2 text-theme-button-close" @click="$store.dispatch('ui/setHeaderType', null)">
      <SvgIcon name="cross" view-box="0 0 14 14" />
    </button>

    <label for="search" class="hidden">
      {{ $t("SEARCH.PLACEHOLDER.SHORT") }}
    </label>

    <input
      ref="search"
      v-model="query"
      v-tooltip="{
        show: nothingFound,
        content: $t('SEARCH.NO_RESULTS'),
        trigger: 'manual',
        placement: 'bottom-start',
        classes: 'search-tip',
      }"
      :placeholder="placeholder"
      :class="{ 'text-grey': nightMode }"
      type="search"
      class="flex-auto w-full py-4 pl-4 mr-2 bg-transparent search-input"
      @keyup.enter="search"
    />

    <button :disabled="!hasInput" class="p-3 transition search-icon text-grey hover:text-blue md:p-4" @click="search">
      <SvgIcon name="search" view-box="0 0 16 16" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchService from "@/services/search";
import { IDelegate } from "@/interfaces";
import { LocaleMessage } from "vue-i18n";

@Component({
  computed: {
    ...mapGetters("delegates", ["delegates"]),
    ...mapGetters("ui", ["nightMode"]),
    ...mapGetters("network", ["knownWallets"]),
  },
})
export default class HeaderSearch extends Vue {
  private query: string | null = null;
  private nothingFound = false;
  private searchCount = 0;
  private placeholder: LocaleMessage | string = "Search";

  private delegates: [IDelegate];
  private nightMode: boolean;
  private knownWallets: any;

  get hasInput() {
    return !!this.query;
  }

  public mounted() {
    (this.$refs.search as HTMLInputElement).focus();

    const WIDTH_THRESHOLD = 1024;
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`);

    widthQuery.addListener((e) => this.setMobilePlaceholder(e.matches));

    this.setMobilePlaceholder(window.innerWidth < WIDTH_THRESHOLD);
  }

  private async search() {
    if (!this.query) {
      return;
    }

    this.nothingFound = false;
    this.searchCount = 0;
    this.query = this.query.trim();

    const address = this.findByNameInKnownWallets(this.query);
    if (address) {
      this.changePage("wallet", { address });
      return;
    } else {
      this.updateSearchCount({ message: "No known wallet with that name could be found" });
    }

    const del = this.delegates.find((d) => d.username === this.query!.toLowerCase());
    if (del) {
      this.changePage("wallet", { address: del.address });
      return;
    } else {
      this.updateSearchCount({ message: "No delegate with that username could be found" });
    }

    try {
      const responseAddress = await SearchService.walletByAddress(this.query);
      this.changePage("wallet", { address: responseAddress.address });
      return;
    } catch (e) {
      this.updateSearchCount(e);
    }

    try {
      const responseDelegate = await SearchService.delegateByQuery(this.query.toLowerCase());
      this.changePage("wallet", { address: responseDelegate.address });
      return;
    } catch (e) {
      this.updateSearchCount(e);
    }

    try {
      const responseBlock = await SearchService.blockByQuery(this.query);
      this.changePage("block", { id: responseBlock.id });
      return;
    } catch (e) {
      this.updateSearchCount(e);
    }

    try {
      const responseTransaction = await SearchService.transactionById(this.query);
      this.changePage("transaction", { id: responseTransaction.id });
      return;
    } catch (e) {
      this.updateSearchCount(e);
    }
  }

  private updateSearchCount(err: any) {
    if (err !== null) {
      // tslint:disable-next-line:no-console
      console.log(err.message || err.data.error);
    }

    // Increment counter to keep track of whether we found anything
    this.searchCount += 1;
    if (this.searchCount === 6) {
      // Should match total amount of callbacks
      this.nothingFound = true;
      setTimeout(() => (this.nothingFound = false), 1500);
    }
  }

  private setMobilePlaceholder(showMobile: boolean) {
    if (!this.$i18n) {
      return;
    }
    this.placeholder = showMobile ? this.$i18n.t("SEARCH.PLACEHOLDER.SHORT") : this.$i18n.t("SEARCH.PLACEHOLDER.LONG");
  }

  private changePage(name: string, params: any) {
    this.$router.push({ name, params });
    this.$store.dispatch("ui/setHeaderType", null);
  }

  private findByNameInKnownWallets(name: string) {
    if (name !== null) {
      for (const address in this.knownWallets) {
        if (this.knownWallets[address]) {
          if (name.toLowerCase() === this.knownWallets[address].toLowerCase()) {
            return address;
          }
        }
      }
    }
  }
}
</script>

<style>
.HeaderSearch {
  @apply .w-full .flex .items-center;
}

.search-input::placeholder {
  color: var(--color-theme-text-placeholder);
}

.search-icon:hover:enabled {
  box-shadow: 0 0 13px 2px rgba(197, 197, 213, 0.24);
  cursor: pointer;
}
</style>
