<template>
  <Modal v-if="address" @close="emitClose">
    <div :class="{ 'max-w-sm': !isCollapsed }" class="text-center px-10 py-2">
      <p class="semibold text-3xl mb-4">
        {{ $t("WALLET.QR_CODE") }}
      </p>
      <p class="mb-8">
        {{ $t(`WALLET.SCAN_FOR_${isCollapsed ? "ADDRESS" : "URI"}`) }}
      </p>

      <div class="flex justify-between items-center">
        <QrCode class="rounded" :value="qrValue" :options="{ size: 160 }" />
        <div v-if="!isCollapsed" class="ml-8">
          <InputNumber :label="$t('TRANSACTION.AMOUNT')" name="amount" @input="onInputChange" />
          <InputText :label="$t('TRANSACTION.SMARTBRIDGE')" name="vendorField" @input="onInputChange" />
        </div>
      </div>

      <div v-if="!isCollapsed" class="flex items-center mt-4">
        <span
          class="block whitespace-no-wrap overflow-x-auto rounded mx-auto bg-theme-feature-background px-4 py-2 text-white font-mono mr-2"
          >{{ qrValue }}</span
        >
        <Clipboard :value="qrValue" />
      </div>

      <button class="mt-8 mx-auto pager-button items-center" @click="isCollapsed = !isCollapsed">
        {{ $t(`WALLET.ADVANCED_QR.${isCollapsed ? "EXPAND" : "COLLAPSE"}`) }}
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { InputText, InputNumber } from "@/components/search/input";
import { URI_QRCODE_SCHEME_PREFIX } from "@/constants";

@Component({
  components: {
    InputNumber,
    InputText,
  },
})
export default class QrModal extends Vue {
  @Prop({ required: true }) public address: string;

  private isCollapsed = true;
  private amount = 0;
  private vendorField = "";

  get qrValue() {
    return this.isCollapsed ? this.address : `${URI_QRCODE_SCHEME_PREFIX}${this.address}${this.formattedParams}`;
  }

  get formattedParams() {
    const params = [];

    if (this.amount) {
      params.push(`amount=${this.amount}`);
    }

    if (this.vendorField) {
      params.push(`vendorField=${this.vendorField}`);
    }

    return params.length > 0 ? `?${params.join("&")}` : "";
  }

  private onInputChange(event: any) {
    const { name, value } = event.target;
    this[name] = value;
  }

  @Watch("isCollapsed")
  public onStatusChanged() {
    this.amount = undefined;
    this.vendorField = undefined;
  }

  public emitClose() {
    this.$emit("close");
  }
}
</script>
