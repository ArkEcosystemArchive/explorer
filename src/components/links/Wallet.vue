<template>
  <span class="block md:inline-block">
    <template v-if="!type">
      <span v-if="isKnown">
        <router-link :to="{ name: 'wallet', params: { address: walletAddress } }" class="flex items-center">
          <svg
            v-tooltip="$t('This wallet has been verified by the Ark team')"
            viewBox="0 0 16 16"
            class="flex flex-none mr-2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16px" height="16px">
            <path fill="none" d="M0,0h16v16H0V0z" />
            <path fill-rule="evenodd" fill="currentColor" d="M8,0L1.5,2.9v4.4c0,4,2.8,7.8,6.5,8.7c3.8-0.9,6.5-4.7,6.5-8.7V2.9L8,0z M6.5,11.6L3.6,8.7l1-1l1.9,1.9l4.8-4.8l1,1 L6.5,11.6z" />
          </svg>
          <span v-tooltip="getAddress()">
            {{ knownWallets[address] }}
          </span>
        </router-link>
      </span>
      <router-link v-else v-tooltip="getAddress()" :to="{ name: 'wallet', params: { address: walletAddress } }">
        <span v-if="hasDefaultSlot"><slot></slot></span>
        <span v-else-if="delegate">{{ delegate.username }}</span>
        <span v-else-if="address">{{ trunc ? truncate(address) : address }}</span>
      </router-link>
    </template>

    <span v-else-if="type === 1">{{ $t("2nd Signature Registration") }}</span>
    <span v-else-if="type === 2">{{ $t("Delegate Registration") }}</span>
    <span v-else-if="type === 3">
      <router-link v-if="votedDelegateAddress" v-tooltip="votedDelegateAddress" :to="{ name: 'wallet', params: { address: votedDelegateAddress } }">
        <span :class="getVoteColor">{{ isUnvote ? $t("Unvote") : $t("Vote") }} <span class="italic">({{ votedDelegateUsername }})</span></span>
      </router-link>
    </span>
    <span v-else-if="type === 4">{{ $t("Multisignature Registration") }}</span>
    <span v-else-if="type === 5">{{ $t("IPFS") }}</span>
    <span v-else-if="type === 6">{{ $t("Timelock Transfer") }}</span>
    <span v-else-if="type === 7">{{ $t("Multipayment") }}</span>
    <span v-else-if="type === 8">{{ $t("Delegate Resignation") }}</span>
  </span>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  props: {
    address: {
      type: String,
    },
    asset: {
      type: Object,
      required: false
    },
    publicKey: {
      type: String,
    },
    type: {
      type: Number,
    },
    trunc: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    delegate: null,
    votedDelegate: null
  }),

  mounted() {
    this.determine()
  },

  watch: {
    delegates() {
      this.determine()
    },
    address() {
      this.determine()
    },
    publicKey() {
      this.determine()
    },
  },

  computed: {
    ...mapGetters('delegates', ['delegates']),
    ...mapGetters('network', ['knownWallets']),

    isKnown() {
      return this.knownWallets.hasOwnProperty(this.address)
    },

    walletAddress() {
      return this.delegate ? this.delegate.address : this.address
    },

    hasDefaultSlot() {
      return !!this.$slots.default
    },

    getVoteColor() {
      return this.isUnvote ? 'text-red' : 'text-green'
    },

    isUnvote() {
      if (this.asset && this.asset.votes) {
        const vote = this.asset.votes[0]
        return vote.charAt(0) === '-'
      }
      return false
    },

    votePublicKey() {
      if (this.asset && this.asset.votes) {
        const vote = this.asset.votes[0]
        return vote.substr(1)
      }
      return ''
    },

    votedDelegateAddress() {
      return this.votedDelegate ? this.votedDelegate.address : ''
    },

    votedDelegateUsername() {
      return this.votedDelegate ? this.votedDelegate.username : ''
    }
  },

  methods: {
    determine() {
      this.address ? this.findByAddress() : this.findByPublicKey()
      if (this.votePublicKey) {
        this.determineVote()
      }
    },

    determineVote() {
      this.votedDelegate = this.delegates.find(d => d.publicKey === this.votePublicKey)
    },

    findByAddress() {
      this.delegate = this.delegates.find(d => d.address === this.address)
    },

    findByPublicKey() {
      this.delegate = this.delegates.find(d => d.publicKey === this.publicKey)
    },

    getAddress() {
      const knownOrDelegate = this.isKnown || this.delegate
      const truncated = !this.hasDefaultSlot && this.trunc

      if (knownOrDelegate || truncated) {
        return this.walletAddress
      }

      return false
    },
  },
}
</script>
