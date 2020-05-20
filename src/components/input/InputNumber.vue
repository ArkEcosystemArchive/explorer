<script lang="ts">
import { Component } from "vue-property-decorator";
import InputText from "./InputText.vue";

@Component({
  data: () => ({ inputType: "number" }),
})
export default class InputNumber extends InputText {}
</script>
