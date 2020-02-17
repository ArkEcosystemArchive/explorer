<template>
  <InputText :label="$t('BLOCK.GENERATED_BY')" name="generatorPublicKey2" class="pt-0" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import InputText from "./InputText.vue";

@Component({
  components: {
    InputText,
  },
})
export default class InputDelegate extends Vue {}
</script>
