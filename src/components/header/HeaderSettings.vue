<template>
  <div
    class="text-settings-icon px-3 md:px-2 py-3 md:py-4 flex flex-none items-center border-b-2 mt-2px border-transparent hover:border-theme-accents hover:text-blue transition cursor-pointer"
    @click="toggleModal"
  >
    <SvgIcon name="filter" view-box="0 0 16 20" />
    <SettingsModal v-if="showModal" @close="toggleModal" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SettingsModal } from "@/components/modals";

@Component({
  components: {
    SettingsModal,
  },
})
export default class HeaderSettings extends Vue {
  private showModal = false;

  public toggleModal() {
    this.showModal = !this.showModal;
  }
}
</script>
