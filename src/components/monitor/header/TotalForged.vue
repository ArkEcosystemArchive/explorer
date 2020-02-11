<template>
  <div class="hidden xl:block border-l border-r border-grey-dark px-10 ml-10">
    <div class="text-grey mb-2 min-w-0">
      {{ $t("PAGES.DELEGATE_MONITOR.HEADER.TOTAL_FORGED", { token: networkToken() }) }}
    </div>
    <div class="text-lg text-white truncate">
      {{ readableCrypto(totalForged, false) }}
    </div>
  </div>
</template>

<script lang="ts">
import { BigNumber } from "@/utils";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["initialSupply", "supply"]),
  },
})
export default class TotalForged extends Vue {
  private initialSupply: string;
  private supply: number;

  get totalForged() {
    if (!this.initialSupply || !this.supply) {
      return 0;
    }

    return BigNumber.make(this.supply)
      .minus(this.initialSupply)
      .toString();
  }
}
</script>
