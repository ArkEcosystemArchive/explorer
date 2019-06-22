<template>
  <div>
    <img
      v-if="!nightMode"
      class="mx-auto"
      src="@/assets/images/not-found/light.png"
    >
    <img
      v-else
      class="mx-auto"
      src="@/assets/images/not-found/dark.png"
    >
    <h1 class="text-3xl">
      {{ $t('Ooops!') }}
    </h1>
    <i18n
      tag="p"
      path="Sorry, dataType dataId could not be found on the blockchain"
      class="mt-2"
    >
      <span place="dataType">{{ dataType }}</span>
      <span
        class="semibold"
        place="dataId"
      >
        {{ dataId }}
      </span>
    </i18n>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'NotFound',

  props: {
    dataType: {
      type: String,
      required: true
    },

    dataId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('ui', ['nightMode'])
  }
}
</script>
