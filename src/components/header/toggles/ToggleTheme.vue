<template>
  <button
    class="px-2 py-2 md:py-4 text-yellow flex-none flex items-center border-b-2 mt-2px border-transparent hover:border-orange transition"
    @click="$store.dispatch('ui/setNightMode', !nightMode)"
    @mouseover="changeImageSource"
    @mouseleave="setImageSource"
  >
    <SvgIcon :name="imageSource" view-box="0 0 30 30" />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class ToggleTheme extends Vue {
  private nightMode: boolean;
  private imageSource: string | null = null;

  public mounted() {
    this.prepareComponent();
  }

  private prepareComponent() {
    this.setImageSource();
    this.$store.watch(state => state.ui.nightMode, value => this.setImageSource());
  }

  private setImageSource() {
    this.imageSource = `theme/${this.nightMode ? "sun" : "moon"}`;
  }

  private changeImageSource() {
    this.imageSource = `theme/hover/${this.nightMode ? "sun" : "moon"}-hover`;
  }
}
</script>
