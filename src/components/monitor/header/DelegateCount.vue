<template>
  <div class="items-center hidden lg:flex">
    <div class="flex-none mr-6 text-blue">
      <SvgIcon class="block" name="group" view-box="0 0 47 38" />
    </div>
    <div>
      <div class="mb-2 text-grey">
        {{ $t("COMMON.DELEGATES") }}
      </div>
      <div class="text-lg text-white truncate semibold">
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate } from "@/interfaces";

@Component({
  computed: {
    ...mapGetters("delegates", ["delegates"]),
  },
})
export default class DelegateCount extends Vue {
  private count = 0;
  private delegates: IDelegate[];

  public mounted() {
    this.prepareComponent();
  }

  private prepareComponent() {
    this.getDelegateCount();

    this.$store.watch(
      (state) => state.delegates.delegates,
      (value) => this.getDelegateCount(),
    );
  }

  private getDelegateCount() {
    this.count = this.delegates.length;
  }
}
</script>
