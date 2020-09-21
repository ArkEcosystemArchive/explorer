<template>
  <section class="mb-5">
    <!-- Desktop -->
    <div class="hidden WalletHeaderDesktop md:flex xl:rounded-lg">
      <button
        class="flex-none p-3 ml-10 mr-6 transition rounded address-button hover-button-shadow"
        @click="toggleModal"
      >
        <SvgIcon class="block" name="qr" view-box="0 0 29 29" />
      </button>
      <div v-if="view === 'public'" class="flex-auto min-w-0 pr-8">
        <div class="flex items-center mb-2 text-grey">
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
          <div class="text-lg text-white truncate semibold">
            <span class="mr-2">{{ wallet.address }}</span>
          </div>
          <Clipboard v-if="wallet.address" :value="wallet.address" />
        </div>
      </div>

      <div v-if="view === 'private' && wallet.publicKey" class="flex-auto min-w-0 pr-8">
        <div class="mb-2 text-grey">
          {{ $t("WALLET.PUBLIC_KEY") }}
        </div>
        <div class="flex">
          <div class="mr-2 text-lg text-white truncate semibold">
            <span>{{ wallet.publicKey }}</span>
          </div>
          <Clipboard v-if="wallet.publicKey" :value="wallet.publicKey" />
        </div>
      </div>

      <div v-if="view === 'public'" class="flex-none border-r border-grey-dark px-9">
        <div class="mb-2 text-grey">
          {{ $t("WALLET.BALANCE", { token: networkToken() }) }}
        </div>
        <div class="text-lg text-white semibold">
          <span v-tooltip="showBalanceTooltip ? readableCurrency(wallet.balance) : ''">
            {{ readableCrypto(wallet.balance, false) }}
          </span>
        </div>
      </div>

      <div v-if="view === 'public' && hasLockedBalance" class="flex-none border-r border-grey-dark px-9">
        <div class="flex items-center mb-2 text-grey">
          {{ $t("WALLET.LOCKED_BALANCE") }}
          <SvgIcon class="ml-2" name="locked-balance" view-box="0 0 16 17" />
        </div>
        <span
          v-tooltip="
            showBalanceTooltip
              ? {
                  trigger: 'hover click',
                  content: readableCurrency(wallet.lockedBalance || 0),
                }
              : ''
          "
          class="text-lg text-white semibold"
        >
          {{ readableCrypto(wallet.lockedBalance, false) }}
        </span>
      </div>

      <div class="flex-none px-8">
        <button
          :disabled="!wallet.publicKey"
          :class="view === 'public' ? 'bg-blue-darker' : 'bg-transparent text-blue-light'"
          class="px-3 py-3 text-xs font-normal text-white transition rounded-md hover:text-blue"
          @click="setView('public')"
        >
          <SvgIcon class="block" name="globe" view-box="0 0 17 17" />
        </button>
        <button
          v-if="wallet.publicKey"
          :class="view === 'private' ? 'bg-blue-darker' : 'bg-transparent text-blue-light'"
          class="px-3 py-3 text-xs font-normal text-white transition rounded-md hover:text-blue"
          @click="setView('private')"
        >
          <SvgIcon class="block" name="key" view-box="0 0 13 14" />
        </button>
      </div>
    </div>

    <!-- Mobile -->
    <div v-if="wallet.address" class="px-5 py-10 overflow-hidden sm:px-10 bg-theme-feature-background md:hidden">
      <div class="flex justify-center mb-6">
        <div class="flex items-center p-2 mx-auto bg-white rounded">
          <QrCode :value="wallet.address" :options="{ size: 160 }" />
        </div>
      </div>
      <div class="px-2">
        <div class="flex flex-wrap -mx-6">
          <div
            :class="{ 'border-r border-grey-dark -mr-1': wallet.publicKey }"
            class="flex-1 px-6 my-4 whitespace-no-wrap md:w-1/2"
          >
            <div class="flex items-center mb-2 text-grey">
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
            <div v-if="name" class="flex text-white semibold">
              {{ name }}
            </div>
            <div class="flex text-white">
              <span class="mr-2">{{ truncate(wallet.address) }}</span>
              <Clipboard v-if="wallet.address" :value="wallet.address" />
            </div>
          </div>
          <div v-if="wallet.publicKey" class="flex-1 px-6 my-4 whitespace-no-wrap md:w-1/2">
            <div class="mb-2 text-grey">
              {{ $t("WALLET.PUBLIC_KEY") }}
            </div>
            <div class="flex text-white">
              <span class="mr-2">{{ truncate(wallet.publicKey) }}</span>
              <Clipboard v-if="wallet.publicKey" :value="wallet.publicKey" />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-6">
          <div
            :class="{ 'border-r border-grey-dark -mr-1': hasLockedBalance }"
            class="flex-1 px-6 my-4 whitespace-no-wrap md:w-1/2"
          >
            <div class="mb-2 text-grey">
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

          <div v-if="view === 'public' && hasLockedBalance" class="flex-1 px-6 my-4 whitespace-no-wrap md:w-1/2">
            <div class="flex items-center mb-2 text-grey">
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

    <QrModal v-if="showModal" :address="wallet.address" @close="toggleModal" />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IWallet } from "@/interfaces";
import WalletVoters from "@/components/wallet/Voters.vue";
import { QrModal } from "@/components/modals";

@Component({
  components: {
    WalletVoters,
    QrModal,
  },
  computed: {
    ...mapGetters("network", ["isListed", "knownWallets", "token"]),
    ...mapGetters("currency", { currencyName: "name" }),
  },
})
export default class WalletDetails extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private view = "public";
  private showModal = false;
  private knownWallets: { [key: string]: string };
  private isListed: boolean;
  private token: string;
  private currencyName: string;

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

  get showBalanceTooltip() {
    return this.isListed && this.token !== this.currencyName;
  }

  private setView(view: string) {
    this.view = view;
  }

  public toggleModal() {
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
