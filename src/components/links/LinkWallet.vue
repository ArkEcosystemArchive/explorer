<template>
  <span class="block md:inline-block">
    <template v-if="!type">
      <span v-if="isKnown">
        <RouterLink
          :to="{ name: 'wallet', params: { address: walletAddress } }"
          class="flex items-center"
        >
          <span v-tooltip="getAddress()">
            {{ knownWallets[address] }}
          </span>
          <svg
            v-tooltip="$t('This is a verified address')"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16px"
            height="17px"
            class="flex flex-none ml-2"
          >
            <path
              fill-rule="evenodd"
              fill="currentColor"
              d="M7.1,14.88c-0.37,0-1.94,0-3.93,0c-0.6,0-0.92-1.14-0.83-1.88c0.21-2.7,1.88-4.03,3.24-5.3 C6.05,7.9,6.56,8.01,7.1,8.01c0.63,0,1.22-0.16,1.75-0.43C8.87,7.59,8.88,7.6,8.9,7.62c0.5,0.47,1,0.95,1.46,1.49 c0.1,0.12,0.15,0.17,0.3,0.38c0.15,0.2,1.71-0.93,1.27-1.45c-0.16-0.16-0.22-0.26-0.33-0.38c-0.44-0.5-0.88-0.92-1.29-1.32 c0.45-0.64,0.72-1.42,0.72-2.26c0-2.17-1.76-3.93-3.93-3.93c-2.17,0-3.93,1.76-3.93,3.93c0,0.93,0.34,1.78,0.88,2.45 c-1.55,1.5-3.83,3.98-3.83,7.3c0,1.89,0.91,3.01,1.97,3.01c2.18,0,3.38,0,3.93,0C7.03,16.85,7.65,14.88,7.1,14.88z M7.1,2.12 c1.08,0,1.96,0.88,1.96,1.96c0,1.08-0.88,1.96-1.96,1.96c-1.08,0-1.96-0.88-1.96-1.96C5.14,3,6.02,2.12,7.1,2.12z M15.79,10.79 l-0.69-0.67c-0.09-0.09-0.21-0.14-0.34-0.14c-0.14,0-0.25,0.05-0.34,0.14l-3.32,3.26L9.6,11.91c-0.09-0.09-0.21-0.14-0.34-0.14 s-0.25,0.05-0.34,0.14l-0.69,0.67c-0.09,0.09-0.14,0.2-0.14,0.34c0,0.13,0.05,0.24,0.14,0.34l1.83,1.79l0.69,0.67 c0.09,0.09,0.21,0.14,0.34,0.14s0.25-0.05,0.34-0.14l0.69-0.67l3.67-3.59c0.09-0.09,0.14-0.2,0.14-0.34 C15.94,10.99,15.89,10.88,15.79,10.79z"
            />
          </svg>
        </RouterLink>
      </span>
      <RouterLink
        v-else
        v-tooltip="getAddress()"
        :to="{ name: 'wallet', params: { address: walletAddress } }"
      >
        <span v-if="hasDefaultSlot">
          <slot />
        </span>
        <span v-else-if="delegate">{{ delegate.username }}</span>
        <span v-else-if="address">
          <span class="hidden md:inline-block">{{ trunc ? truncate(address) : address }}</span>
          <span class="md:hidden">{{ truncate(address) }}</span>
        </span>
      </RouterLink>
    </template>

    <span v-else-if="type === 1">{{ $t("2nd Signature Registration") }}</span>
    <span v-else-if="type === 2">{{ $t("Delegate Registration") }}</span>
    <span v-else-if="type === 3">
      <RouterLink
        v-if="votedDelegateAddress"
        v-tooltip="votedDelegateAddress"
        :to="{ name: 'wallet', params: { address: votedDelegateAddress } }"
      >
        <span :class="getVoteColor">{{ isUnvote ? $t("Unvote") : $t("Vote") }} <span class="italic">({{ votedDelegateUsername }})</span></span>
      </RouterLink>
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
  name: 'LinkWallet',

  props: {
    address: {
      type: String,
      required: false,
      default: ''
    },
    asset: {
      type: Object,
      required: false,
      default: null
    },
    publicKey: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: Number,
      required: false,
      default: 0
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

  computed: {
    ...mapGetters('delegates', ['delegates']),
    ...mapGetters('network', ['knownWallets']),

    isKnown () {
      return this.knownWallets[this.address]
    },

    walletAddress () {
      return this.delegate ? this.delegate.address : this.address
    },

    hasDefaultSlot () {
      return !!this.$slots.default
    },

    getVoteColor () {
      return this.isUnvote ? 'text-red' : 'text-green'
    },

    isUnvote () {
      if (this.asset && this.asset.votes) {
        const vote = this.asset.votes[0]
        return vote.charAt(0) === '-'
      }
      return false
    },

    votePublicKey () {
      if (this.asset && this.asset.votes) {
        const vote = this.asset.votes[0]
        return vote.substr(1)
      }
      return ''
    },

    votedDelegateAddress () {
      return this.votedDelegate ? this.votedDelegate.address : ''
    },

    votedDelegateUsername () {
      return this.votedDelegate ? this.votedDelegate.username : ''
    }
  },

  watch: {
    delegates () {
      this.determine()
    },
    address () {
      this.determine()
    },
    publicKey () {
      this.determine()
    }
  },

  mounted () {
    this.determine()
  },

  methods: {
    determine () {
      this.address ? this.findByAddress() : this.findByPublicKey()
      if (this.votePublicKey) {
        this.determineVote()
      }
    },

    determineVote () {
      this.votedDelegate = this.delegates.find(d => d.publicKey === this.votePublicKey)
    },

    findByAddress () {
      this.delegate = this.delegates.find(d => d.address === this.address)
    },

    findByPublicKey () {
      this.delegate = this.delegates.find(d => d.publicKey === this.publicKey)
    },

    getAddress () {
      const knownOrDelegate = this.isKnown || this.delegate
      const truncated = !this.hasDefaultSlot && this.trunc

      if (knownOrDelegate || truncated) {
        return this.walletAddress
      }

      return false
    }
  }
}
</script>
