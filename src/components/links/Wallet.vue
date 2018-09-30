<template>
  <span>
    <span class="hidden md:inline-block">
      <router-link v-if="!type" v-tooltip="getAddress()" :to="{ name: 'wallet', params: { address: walletAddress } }">
        <span v-if="isKnown">{{ knownWallets[address] }}</span>
        <span v-else-if="delegate">{{ delegate.username }}</span>
        <span v-else-if="hasDefaultSlot"><slot></slot></span>
        <span v-else-if="address">{{ trunc ? truncate(address) : address }}</span>
      </router-link>

      <span v-if="type === 1">{{ $t("2nd Signature Registration") }}</span>
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

    <span class="md:hidden">
      <router-link v-if="!type"v-tooltip="walletAddress"  :to="{ name: 'wallet', params: { address: walletAddress } }">
        <span v-if="isKnown">{{ knownWallets[address] }}</span>
        <span v-else-if="delegate">{{ delegate.username }}</span>
        <span v-else-if="address">{{ truncate(address) }}</span>
      </router-link>

      <span v-if="type === 1">{{ $t("2nd Signature Registration") }}</span>
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
