<template>
  <div>
    <img v-if="!nightMode" class="mx-auto" src="@/assets/images/not-found/light.png" />
    <img v-else class="mx-auto" src="@/assets/images/not-found/dark.png" />

    <h1 class="text-3xl">
      {{ $t("PAGES.NOT_FOUND.TITLE") }}
    </h1>

    <i18n tag="p" path="PAGES.NOT_FOUND.DATA" class="mt-2">
      <span place="dataType">{{ dataType }}</span>
      <span class="semibold" place="dataId">
        {{ dataId }}
      </span>
    </i18n>

    <button :disabled="isLoading" class="mt-4 button-lg" @click="emitReload">
      <span v-if="!isLoading">{{ $t("COMMON.RELOAD") }}</span>
      <Loader v-else :data="null" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IBlock } from "@/interfaces";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class NotFound extends Vue {
  @Prop({ required: true }) public isLoading: boolean;
  @Prop({ required: true }) public dataType: string;
  @Prop({ required: true }) public dataId: string;

  private emitReload() {
    this.$emit("reload");
  }
}
</script>
