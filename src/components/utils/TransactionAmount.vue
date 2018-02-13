<template>
  <span :class="{
    'text-red': transaction.senderId === $route.params.address,
    'text-green': transaction.recipientId === $route.params.address,
  }">{{ readableCrypto(transaction.amount) }}</span>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>
