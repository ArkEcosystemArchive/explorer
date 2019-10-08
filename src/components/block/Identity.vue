<template>
  <section
    class="mb-5 bg-theme-feature-background xl:rounded-lg flex flex-col md:flex-row items-center px-5 sm:px-10 py-8"
  >
    <div class="flex items-center flex-auto w-full md:w-auto mb-5 md:mb-0 truncate md:mr-10">
      <SvgIcon class="mr-6" name="block" view-box="0 0 35 38" />
      <div class="flex-auto min-w-0">
        <div class="text-grey mb-2">
          {{ $t("BLOCK.ID") }}
        </div>
        <div class="flex">
          <div class="text-xl text-white semibold truncate">
            <span v-tooltip="block.id" class="mr-2">
              {{ block.id }}
            </span>
          </div>
          <Clipboard v-if="block.id" :value="block.id" />
        </div>
      </div>
    </div>
    <div class="flex w-full md:block md:w-auto justify-between whitespace-no-wrap">
      <button :disabled="isFirstBlock" class="block-pager-button mr-5" @click="prevHandler">
        <SvgIcon class="inline" name="pagination/previous" view-box="0 0 11 11" />
        <span class="ml-2 hidden md:block inline-button">{{ $t("BLOCK.PAGINATION.PREVIOUS") }}</span>
        <span class="ml-2 md:hidden">{{ $t("PAGINATION.PREVIOUS") }}</span>
      </button>
      <button :disabled="isLastBlock" class="block-pager-button" @click="nextHandler">
        <span class="mr-2 hidden md:block inline-button">{{ $t("BLOCK.PAGINATION.NEXT") }}</span>
        <span class="mr-2 md:hidden">{{ $t("PAGINATION.NEXT") }}</span>
        <SvgIcon class="inline" name="pagination/next" view-box="0 0 11 11" />
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IBlock } from "../../interfaces";

@Component({
  computed: {
    ...mapGetters("network", ["height"]),
  },
})
export default class BlockIdentity extends Vue {
  @Prop({ required: true }) public block: IBlock;
  @Prop({ required: true }) public prevHandler: () => void;
  @Prop({ required: true }) public nextHandler: () => void;

  private height: number;

  get isFirstBlock(): boolean {
    return this.block.height === 1;
  }

  get isLastBlock(): boolean {
    return this.block.height === this.height;
  }
}
</script>

<style>
@media (min-width: 768px) {
  .inline-button {
    display: inline-block;
  }
}
</style>
