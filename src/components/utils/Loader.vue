<template>
  <span>
    <div v-if="data === null" class="text-center">
      <PulseLoader color="#037cff" />
    </div>

    <slot v-else />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISortParameters, IWallet } from "@/interfaces";
// @ts-ignore
import { PulseLoader } from "vue-spinner/dist/vue-spinner.min.js";

@Component({
  components: {
    PulseLoader,
  },
})
export default class Loader extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public data: any[] | null;
}
</script>
