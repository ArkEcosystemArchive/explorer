<script lang="ts">
import { Component } from "vue-property-decorator";
import InputText from "./InputText.vue";

@Component({
  data: () => ({ inputType: "select" }),
})
export default class InputSelect extends InputText {}
</script>
