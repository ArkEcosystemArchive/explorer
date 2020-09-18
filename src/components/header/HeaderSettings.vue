<template>
  <div
    class="flex items-center flex-none px-3 py-3 transition border-b-2 border-transparent cursor-pointer text-settings-icon md:px-2 md:py-4 mt-2px hover:border-theme-accents hover:text-blue"
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
