<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.DELEGATE_MONITOR.TITLE") }}</ContentHeader>

    <MonitorHeader />

    <section class="page-section py-5 md:py-10">
      <TabsNavigation>
        <TabsNavigationItem
          id="active"
          :title="$t('PAGES.DELEGATE_MONITOR.ACTIVE')"
          :is-active="activeTab === 'active'"
          @click="activeTab = 'active'"
        />

        <TabsNavigationItem
          id="standby"
          :title="$t('PAGES.DELEGATE_MONITOR.STANDBY')"
          :is-active="activeTab === 'standby'"
          @click="activeTab = 'standby'"
        />

        <TabsNavigationItem
          id="resigned"
          :title="$t('PAGES.DELEGATE_MONITOR.RESIGNED')"
          :is-active="activeTab === 'resigned'"
          @click="activeTab = 'resigned'"
        />
      </TabsNavigation>

      <ForgingStats v-show="activeTab === 'active'" :delegates="delegates || []" />

      <TableDelegates
        :delegates="delegates"
        :active-tab="activeTab"
        :sort-query="sortParams[activeTab]"
        @on-sort-change="onSortChange"
      />

      <div v-if="delegates && delegates.length === activeDelegates" class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
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
import { TabsNavigation, TabsNavigationItem } from "@/components/utils/tabs";
import DelegateService from "@/services/delegate";

@Component({
  components: {
    MonitorHeader,
    ForgingStats,
    TabsNavigation,
    TabsNavigationItem,
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
