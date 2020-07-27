<template>
  <InputField
    :label="label"
    :helper-text="helperText"
    :is-dirty="isDirty"
    :is-disabled="isDisabled"
    :is-focused="isFocused"
    :is-invalid="isInvalid"
    :is-read-only="isReadOnly"
    :type="inputType"
    class="InputText"
  >
    <div slot-scope="{ inputClass }" :class="inputClass" class="flex items-baseline">
      <slot name="left" />
      <textarea
        v-if="inputType === 'textarea'"
        ref="input"
        v-model="model"
        :class="[
          { 'InputText__input--read-only': isReadOnly, 'InputText__input--large': isLarge, 'text-grey': nightMode },
        ]"
        :rows="rows"
        :name="name"
        :disabled="isDisabled || isReadOnly"
        :placeholder="placeholder"
        class="flex-1 text-black border-b InputText__input"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <select
        v-else-if="inputType === 'select'"
        ref="input"
        v-model="model"
        :class="[
          { 'InputText__input--read-only': isReadOnly, 'InputText__input--large': isLarge, 'text-grey': nightMode },
        ]"
        :name="name"
        :disabled="isDisabled || isReadOnly"
        :placeholder="placeholder"
        class="flex-1 text-black InputText__input InputSelect__input"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
        <option v-for="selectOption in selectOptions" :key="selectOption.value" :value="selectOption.value">
          {{ selectOption.display }}
        </option>
      </select>
      <input
        v-else
        ref="input"
        v-model="model"
        :class="[
          { 'InputText__input--read-only': isReadOnly, 'InputText__input--large': isLarge, 'text-grey': nightMode },
        ]"
        :name="name"
        :disabled="isDisabled || isReadOnly"
        :type="inputType"
        :value="value"
        :placeholder="placeholder"
        :min="inputType === 'number' && 0"
        class="flex-1 text-black InputText__input"
        @input="onInput"
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
import { mapGetters } from "vuex";

@Component({
  components: {
    InputField,
  },
  data: (vm: InputText) => ({
    inputValue: vm.value,
  }),
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
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
  @Prop({ default: null }) public selectOptions!: Array<{ [key: string]: string }>;
  private inputType = "text";
  private isFocused = false;
  private inputValue = "";

  @Watch("value")
  public onValueChanged(value: string) {
    this.inputValue = value;
  }

  get model() {
    return this.inputValue;
  }

  set model(value: string) {
    this.inputValue = value;
  }

  private onInput(event: any) {
    this.$emit("input", event);
  }

  private onChange(event: any) {
    this.$emit("change", event);
  }

  get isDirty() {
    return (
      !!this.inputValue || this.inputType === "date" || this.inputType === "datetime-local" || this.inputType === "file"
    );
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
  @apply .bg-transparent .w-full;
}

.InputText__input::placeholder {
  @apply .text-transparent;
  transition: color 0s;
}

.InputField--focused .InputText__input::placeholder {
  transition: color 0.1s;
}

.InputText__input--large {
  @apply .text-xl;
}

.InputText__input--read-only {
  cursor: text;
}

.InputSelect__input {
  cursor: pointer;
}

[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
