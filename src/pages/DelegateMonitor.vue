<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.DELEGATE_MONITOR.TITLE") }}</ContentHeader>

    <MonitorHeader />

    <section class="py-5 page-section md:py-10">
      <nav class="flex items-end mx-5 mb-4 overflow-x-auto border-b sm:mx-10">
        <div :class="activeTab === 'active' ? 'active-tab' : 'inactive-tab'" @click="activeTab = 'active'">
          {{ $t("PAGES.DELEGATE_MONITOR.ACTIVE") }}
        </div>
        <div :class="activeTab === 'standby' ? 'active-tab' : 'inactive-tab'" @click="activeTab = 'standby'">
          {{ $t("PAGES.DELEGATE_MONITOR.STANDBY") }}
        </div>
        <div :class="activeTab === 'resigned' ? 'active-tab' : 'inactive-tab'" @click="activeTab = 'resigned'">
          {{ $t("PAGES.DELEGATE_MONITOR.RESIGNED") }}
        </div>
      </nav>

      <ForgingStats v-show="activeTab === 'active'" :delegates="delegates || []" />

      <TableDelegates
        :delegates="delegates"
        :active-tab="activeTab"
        :sort-query="sortParams[activeTab]"
        @on-sort-change="onSortChange"
      />

      <div v-if="delegates && delegates.length === activeDelegates" class="flex flex-wrap mx-5 mt-5 sm:mx-10 md:mt-10">
        <RouterLink
          :to="{
            name: activeTab === 'resigned' ? 'delegates-resigned' : 'delegates',
            params: { page: activeTab === 'standby' ? 5 : 3 },
          }"
          tag="button"
          class="button-lg"
        >
          {{ $t("PAGINATION.SHOW_MORE") }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate, ISortParameters } from "@/interfaces";
import { MonitorHeader, ForgingStats } from "@/components/monitor";
import DelegateService from "@/services/delegate";

@Component({
  components: {
    MonitorHeader,
    ForgingStats,
  },
  computed: {
    ...mapGetters("network", ["height", "activeDelegates"]),
  },
})
export default class DelegateMonitor extends Vue {
  private delegates: IDelegate[] | null = null;
  private activeTab = "active";
  private height: number;

  get sortParams() {
    return this.$store.getters["ui/delegateSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setDelegateSortParams", {
      ...this.sortParams,
      [this.activeTab]: {
        field: params.field,
        type: params.type,
      },
    });
  }

  @Watch("height")
  public async onHeightChanged() {
    await this.setDelegates();
  }

  @Watch("activeTab")
  public async onActiveTabChanged() {
    this.delegates = null;
    await this.setDelegates();
  }

  public async created() {
    await this.setDelegates();
  }

  private async setDelegates() {
    if (this.height) {
      // @ts-ignore
      this.delegates = await DelegateService[this.activeTab]();
    }
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
