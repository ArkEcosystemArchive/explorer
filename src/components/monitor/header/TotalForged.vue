<template>
  <div class="hidden xl:block border-l border-r border-grey-dark px-10 ml-10">
    <div class="text-grey mb-2 min-w-0">
      {{ $t("PAGES.DELEGATE_MONITOR.HEADER.TOTAL_FORGED", { token: networkToken() }) }}
    </div>
    <div class="text-lg text-white truncate">
      {{ readableCrypto(forged, false) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["height", "rewardOffset"]),
  },
})
export default class TotalForged extends Vue {
  private forged: number = 0;
  private height: number;
  private rewardOffset: number;

  public mounted() {
    this.prepareComponent();
  }

  private prepareComponent() {
    this.getTotal();

    this.$store.watch(state => state.network.height, value => this.getTotal());
  }

  private getTotal() {
    if (this.height < this.rewardOffset) {
      this.forged = 0;
    } else {
      this.forged = (this.height - this.rewardOffset) * 2 * 1e8;
    }
  }
}
</script>
