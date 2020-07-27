<template>
  <Modal v-if="address" @close="emitClose">
    <div :class="{ 'max-w-sm': !isCollapsed }" class="px-10 py-2 text-center">
      <p class="mb-4 text-3xl semibold">
        {{ $t("WALLET.QR_CODE") }}
      </p>
      <p class="mb-8">
        {{ $t(`WALLET.SCAN_FOR_${isCollapsed ? "ADDRESS" : "URI"}`) }}
      </p>

      <div class="flex items-center justify-between">
        <QrCode class="rounded" :value="qrValue" :options="{ size: 160 }" />
        <div v-if="!isCollapsed" class="ml-8">
          <InputNumber :label="$t('TRANSACTION.AMOUNT')" name="amount" @input="onInputChange" />
          <InputText :label="$t('TRANSACTION.SMARTBRIDGE')" name="vendorField" @input="onInputChange" />
        </div>
      </div>

      <div v-if="!isCollapsed" class="flex items-center mt-4">
        <span
          class="block px-4 py-2 mx-auto mr-2 overflow-x-auto font-mono text-white whitespace-no-wrap rounded bg-theme-feature-background"
          >{{ qrValue }}</span
        >
        <Clipboard :value="qrValue" />
      </div>

      <button class="items-center mx-auto mt-8 pager-button" @click="isCollapsed = !isCollapsed">
        {{ $t(`WALLET.ADVANCED_QR.${isCollapsed ? "EXPAND" : "COLLAPSE"}`) }}
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { URI_QRCODE_SCHEME_PREFIX } from "@/constants";

@Component
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
