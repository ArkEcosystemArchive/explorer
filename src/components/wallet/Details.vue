<template>
  <section class="mb-5">
    <!-- Desktop -->
    <div class="WalletHeaderDesktop hidden md:flex xl:rounded-lg">
      <button
        class="address-button ml-10 mr-6 p-3 rounded flex-none hover-button-shadow transition"
        @click="toggleModal()"
      >
        <SvgIcon class="block" name="qr" view-box="0 0 29 29" />
      </button>
      <div v-if="view === 'public'" class="pr-8 flex-auto min-w-0">
        <div class="flex items-center text-grey mb-2">
          <span>{{ $t("WALLET.ADDRESS") }}</span>
          <SvgIcon
            v-if="wallet.secondPublicKey"
            v-tooltip="$t('WALLET.SECOND_PASSPHRASE_ENABLED')"
            class="ml-2"
            name="second-passphrase"
            view-box="0 0 14 14"
          />
          <SvgIcon
            v-if="wallet.multiSignature"
            v-tooltip="$t('WALLET.MULTI_SIGNATURE_WALLET')"
            class="ml-2"
            name="multi-signature"
            view-box="0 0 14 14"
          />
          <span v-if="name" class="ml-2 text-white semibold">
            {{ name }}
          </span>
          <SvgIcon
            v-if="name"
            v-tooltip="$t('WALLET.VERIFIED')"
            class="ml-2 text-white"
            name="verified"
            view-box="0 0 16 17"
          />
        </div>
        <div class="flex">
          <div class="text-lg text-white semibold truncate">
            <span class="mr-2">{{ wallet.address }}</span>
          </div>
          <Clipboard v-if="wallet.address" :value="wallet.address" />
        </div>
      </div>

      <div v-if="view === 'private' && wallet.publicKey" class="pr-8 flex-auto min-w-0">
        <div class="text-grey mb-2">
          {{ $t("WALLET.PUBLIC_KEY") }}
        </div>
        <div class="flex">
          <div class="text-lg text-white semibold truncate mr-2">
            <span>{{ wallet.publicKey }}</span>
          </div>
          <Clipboard v-if="wallet.publicKey" :value="wallet.publicKey" />
        </div>
      </div>

      <div v-if="view === 'public'" class="flex-none border-r border-grey-dark px-9">
        <div class="text-grey mb-2">
          {{ $t("WALLET.BALANCE", { token: networkToken() }) }}
        </div>
        <div class="text-lg text-white semibold">
          <span v-tooltip="readableCurrency(wallet.balance)">
            {{ readableCrypto(wallet.balance, false) }}
          </span>
        </div>
      </div>

      <div v-if="view === 'public' && hasLockedBalance" class="flex-none border-r border-grey-dark px-9">
        <div class="flex items-center text-grey mb-2">
          {{ $t("WALLET.LOCKED_BALANCE") }}
          <SvgIcon class="ml-2" name="locked-balance" view-box="0 0 16 17" />
        </div>
        <span
          v-tooltip="{
            trigger: 'hover click',
            content: readableCurrency(wallet.lockedBalance || 0),
          }"
          class="text-lg text-white semibold"
        >
          {{ readableCrypto(wallet.lockedBalance, false) }}
        </span>
      </div>

      <div class="flex-none px-8">
        <button
          :disabled="!wallet.publicKey"
          :class="view === 'public' ? 'bg-orange-darker' : 'bg-transparent text-orange-light'"
          class="py-3 px-3 rounded-md text-white font-normal text-xs hover:text-orange transition"
          @click="setView('public')"
        >
          <SvgIcon class="block" name="globe" view-box="0 0 17 17" />
        </button>
        <button
          v-if="wallet.publicKey"
          :class="view === 'private' ? 'bg-orange-darker' : 'bg-transparent text-orange-light'"
          class="py-3 px-3 rounded-md text-white font-normal text-xs hover:text-orange transition"
          @click="setView('private')"
        >
          <SvgIcon class="block" name="key" view-box="0 0 13 14" />
        </button>
      </div>
    </div>

    <!-- Mobile -->
    <div v-if="wallet.address" class="px-5 sm:px-10 py-10 bg-theme-feature-background md:hidden overflow-hidden">
      <div class="flex justify-center mb-6">
        <div class="flex items-center p-2 bg-white rounded mx-auto">
          <QrCode :value="wallet.address" :options="{ size: 160 }" />
        </div>
      </div>
      <div class="px-2">
        <div class="flex flex-wrap -mx-6">
          <div
            :class="{ 'border-r border-grey-dark -mr-1': wallet.publicKey }"
            class="md:w-1/2 px-6 flex-1 whitespace-no-wrap my-4"
          >
            <div class="flex items-center text-grey mb-2">
              <span class="mr-2">{{ $t("WALLET.ADDRESS") }}</span>
              <SvgIcon
                v-if="wallet.secondPublicKey"
                v-tooltip="{ trigger: 'click', content: $t('WALLET.SECOND_PASSPHRASE_ENABLED') }"
                name="second-passphrase"
                view-box="0 0 14 14"
              />
              <SvgIcon
                v-if="wallet.multiSignature"
                v-tooltip="$t('WALLET.MULTI_SIGNATURE_WALLET')"
                class="ml-2"
                name="multi-signature"
                view-box="0 0 14 14"
              />
            </div>
            <div v-if="name" class="text-white semibold flex">
              {{ name }}
            </div>
            <div class="text-white flex">
              <span class="mr-2">{{ truncate(wallet.address) }}</span>
              <Clipboard v-if="wallet.address" :value="wallet.address" />
            </div>
          </div>
          <div v-if="wallet.publicKey" class="md:w-1/2 px-6 flex-1 whitespace-no-wrap my-4">
            <div class="text-grey mb-2">
              {{ $t("WALLET.PUBLIC_KEY") }}
            </div>
            <div class="text-white flex">
              <span class="mr-2">{{ truncate(wallet.publicKey) }}</span>
              <Clipboard v-if="wallet.publicKey" :value="wallet.publicKey" />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-6">
          <div
            :class="{ 'border-r border-grey-dark -mr-1': hasLockedBalance }"
            class="md:w-1/2 px-6 flex-1 whitespace-no-wrap my-4"
          >
            <div class="text-grey mb-2">
              {{ $t("WALLET.BALANCE", { token: networkToken() }) }}
            </div>
            <div class="text-white">
              <span
                v-tooltip="{
                  trigger: 'hover click',
                  content: readableCurrency(wallet.balance),
                }"
              >
                {{ readableCrypto(wallet.balance, false) }}
              </span>
            </div>
          </div>

          <div v-if="view === 'public' && hasLockedBalance" class="md:w-1/2 px-6 flex-1 whitespace-no-wrap my-4">
            <div class="flex items-center text-grey mb-2">
              {{ $t("WALLET.LOCKED_BALANCE") }}
              <SvgIcon class="ml-2" name="locked-balance" view-box="0 0 16 17" />
            </div>
            <span
              v-tooltip="{
                trigger: 'hover click',
                content: readableCurrency(wallet.lockedBalance),
              }"
              class="text-white"
            >
              {{ readableCrypto(wallet.lockedBalance, false) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Modal v-if="showModal" @close="toggleModal()">
      <div class="text-center px-10 py-2">
        <p class="semibold text-3xl mb-4">
          {{ $t("WALLET.QR_CODE") }}
        </p>
        <p class="mb-10">
          {{ $t("WALLET.SCAN_FOR_ADDRESS") }}
        </p>
        <QrCode :value="wallet.address" :options="{ size: 160 }" />
      </div>
    </Modal>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IWallet } from "@/interfaces";
import WalletVoters from "@/components/wallet/Voters.vue";

@Component({
  components: {
    WalletVoters,
  },
  computed: {
    ...mapGetters("network", ["knownWallets"]),
  },
})
export default class WalletDetails extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private view: string = "public";
  private showModal: boolean = false;
  private knownWallets: { [key: string]: string };

  get name() {
    return this.knownWallets[this.wallet.address];
  }

  get isDelegate() {
    return this.wallet.isDelegate;
  }

  get votedDelegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.vote) || {};
  }

  get isVoting() {
    return !!this.wallet.vote;
  }

  get hasLockedBalance() {
    return !!this.wallet.lockedBalance;
  }

  private setView(view: string) {
    this.view = view;
  }

  private toggleModal() {
    this.showModal = !this.showModal;
  }
}
</script>

<style scoped>
.WalletHeaderDesktop {
  @apply .bg-theme-feature-background .items-center .py-8;
}

.address-button {
  background-color: #0964e4;
}

.address-button:hover {
  background-color: #0964e4;
  transform: scale(1.1);
}
</style>
