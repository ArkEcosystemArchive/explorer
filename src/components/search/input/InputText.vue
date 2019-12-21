<template>
  <InputField
    :label="label"
    :helper-text="helperText"
    :is-dirty="isDirty"
    :is-disabled="isDisabled"
    :is-focused="isFocused"
    :is-invalid="isInvalid"
    :warning-text="warning"
    :is-read-only="isReadOnly"
    :type="inputType"
    class="InputText"
  >
    <div slot-scope="{ inputClass }" :class="inputClass" class="flex items-baseline">
      <slot name="left" />
      <textarea
        v-if="inputType === 'textarea'"
        ref="input"
        v-on:input="onInput"
        v-model="model"
        :class="[{ 'InputText__input--read-only': isReadOnly, 'InputText__input--large': isLarge }]"
        :rows="rows"
        :name="name"
        :disabled="isDisabled || isReadOnly"
        :placeholder="placeholder"
        class="InputText__input flex-1 border-b resize-none"
        @focus="onFocus"
        @blur="onBlur"
      />
      <input
        v-else
        ref="input"
        v-on:input="onInput"
        v-model="model"
        :class="[{ 'InputText__input--read-only': isReadOnly, 'InputText__input--large': isLarge }]"
        :name="name"
        :disabled="isDisabled || isReadOnly"
        :type="inputType"
        :value="value"
        :placeholder="placeholder"
        class="InputText__input flex-1"
        @focus="onFocus"
        @blur="onBlur"
      />
      <slot name="right" />
    </div>
  </InputField>
</template>

<script lang="ts">
import InputField from "./InputField.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    InputField,
  },
  data: (vm: InputText) => ({
    inputValue: vm.value,
  }),
})
export default class InputText extends Vue {
  @Prop({ default: null }) public label!: string | null;
  @Prop({ default: "" }) public placeholder!: string;
  @Prop({ required: true }) public name!: string;
  @Prop({ default: 6 }) public rows!: number;
  @Prop({ default: null }) public helperText!: string | null;
  @Prop({ default: false }) public isLarge!: boolean;
  @Prop({ default: false }) public isDisabled!: boolean;
  @Prop({ default: false }) public isInvalid!: boolean;
  @Prop({ default: false }) public isReadOnly!: boolean;
  @Prop({ default: undefined }) public value!: string;
  @Prop() public errors!: { [key: string]: any };
  @Prop({ default: undefined }) public errorsKey!: string;

  private inputType: string = "text";
  private isFocused: boolean = false;
  private inputValue: string = "";

  @Watch("value")
  public onValueChanged(value: string) {
    this.inputValue = value;
  }

  private onInput(e) {
    this.$emit("input", e);
  }

  get model() {
    return this.inputValue;
  }

  set model(value: string) {
    this.inputValue = value;
  }

  get isDirty() {
    return (
      !!this.inputValue || this.inputType === "date" || this.inputType === "datetime-local" || this.inputType === "file"
    );
  }

  get isWarning() {
    return !!this.isDirty && !!this.warning;
  }

  get warning() {
    const errorsKey = this.name
      .split("[")
      .join(".")
      .split("]")
      .join("");

    return this.errors[errorsKey] ? this.errors[errorsKey][0] : null;
  }

  private onFocus() {
    this.isFocused = true;
  }

  private onBlur() {
    this.isFocused = false;
  }
}
</script>

<style>
.InputText__input {
  @apply .bg-transparent .text-grey-darkest;
}

.InputText__input::placeholder {
  @apply .text-transparent;
  transition: color 0s;
}

.InputField--focused .InputText__input::placeholder {
  @apply .text-grey;
  transition: color 0.1s;
}

.InputText__input--large {
  @apply .text-xl;
}

.InputText__input--read-only {
  cursor: text;
}

[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
