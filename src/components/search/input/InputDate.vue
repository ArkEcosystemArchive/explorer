<script lang="ts">
import { Component } from "vue-property-decorator";
import InputText from "./InputText.vue";

@Component({
  data: () => ({ inputType: "date" }),
})
export default class InputDate extends InputText {}
</script>
