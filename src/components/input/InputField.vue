<template>
  <section
    :class="[
      {
        'InputField--dirty': isDirty,
        'InputField--disabled': isDisabled,
        'InputField--focused': isFocused,
        'InputField--invalid': warningText,
      },
    ]"
    class="InputField"
  >
    <div
      class="relative inline-flex items-end w-full mb-1 appearance-none InputField__wrapper"
      :class="type !== 'textarea' ? 'h-12' : ''"
    >
      <slot :inputClass="inputClass" />
      <label
        v-show="label"
        class="absolute truncate pointer-events-none text-grey"
        :class="type !== 'textarea' ? 'InputField__label' : 'InputField__label__textarea'"
        >{{ label }}</label
      >
    </div>
    <p v-show="helperText || warningText" class="mt-1 text-xs InputField__helper text-grey-400">
      <slot name="helper">{{ helperText || warningText }}</slot>
    </p>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InputField extends Vue {
  @Prop({ default: null }) public label!: string | null;
  @Prop({ default: null }) public helperText!: string | null;
  @Prop({ default: false }) public isDirty!: boolean;
  @Prop({ default: false }) public isDisabled!: boolean;
  @Prop({ default: false }) public isFocused!: boolean;
  @Prop({ default: false }) public isInvalid!: boolean;
  @Prop({ default: null }) public warningText!: string | null;
  @Prop({ required: true }) public type!: string;

  get inputClass() {
    let inputClasses = "InputField__input w-full pt-3 left-0 bg-transparent transition text-grey";
    if (this.type !== "textarea") {
      inputClasses += " border-b border-theme-input-field-border h-10";
    }
    return inputClasses;
  }
}
</script>

<style>
.InputField--disabled {
  pointer-events: none;
}

.InputField__input:focus {
  @apply .border-blue;
}

.InputField__input:hover {
  @apply .border-theme-input-field-border-hover;
}

.InputField__label {
  bottom: 0.5em;
  transform-origin: left top;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.InputField--focused .InputField__label,
.InputField--dirty .InputField__label {
  @apply .font-semibold;
  bottom: 0.5em;
  transform: translate(0%, -100%) scale(0.75);
}

.InputField__label__textarea {
  top: 0.9em;
  transform-origin: left top;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.InputField--focused .InputField__label__textarea,
.InputField--dirty .InputField__label__textarea {
  @apply .font-semibold;
  top: 0.5em;
  transform: translate(0%, -100%) scale(0.75);
}

.InputField--focused .InputField__label,
.InputField--focused .InputField__label__textarea {
  @apply .text-blue;
}

.InputField--disabled .InputField__input {
  @apply .text-grey .border-dotted;
}

.InputField--invalid .InputField__label,
.InputField--invalid .InputField__helper,
.InputField--invalid .InputField__label__textarea {
  @apply .text-red-dark;
}
.InputField--invalid .InputField__input {
  @apply .border-red-dark;
}

.InputField--warning .InputField__label,
.InputField--warning .InputField__helper,
.InputField--warning .InputField__label__textarea {
  @apply .text-orange-dark;
}
.InputField--warning .InputField__input {
  @apply .border-orange-dark;
}
</style>
