<template>
  <section
    class="flex flex-col items-center px-5 py-8 mb-5 bg-theme-feature-background xl:rounded-lg md:flex-row sm:px-10"
  >
    <div class="flex items-center flex-auto w-full mb-5 truncate md:w-auto md:mb-0 md:mr-10">
      <SvgIcon class="mr-6" name="block" view-box="0 0 35 38" />
      <div class="flex-auto min-w-0">
        <div class="mb-2 text-grey">
          {{ $t("BLOCK.ID") }}
        </div>
        <div class="flex">
          <div class="text-xl text-white truncate semibold">
            <span v-tooltip="block.id" class="mr-2">
              {{ block.id }}
            </span>
          </div>
          <Clipboard v-if="block.id" :value="block.id" />
        </div>
      </div>
    </div>
    <div class="flex justify-between w-full whitespace-no-wrap md:block md:w-auto">
      <button :disabled="isFirstBlock" class="mr-5 block-pager-button" @click="prevHandler">
        <SvgIcon class="inline" name="pagination/previous" view-box="0 0 11 11" />
        <span class="hidden ml-2 md:block inline-button">{{ $t("BLOCK.PAGINATION.PREVIOUS") }}</span>
        <span class="ml-2 md:hidden">{{ $t("PAGINATION.PREVIOUS") }}</span>
      </button>
      <button :disabled="isLastBlock" class="block-pager-button" @click="nextHandler">
        <span class="hidden mr-2 md:block inline-button">{{ $t("BLOCK.PAGINATION.NEXT") }}</span>
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
