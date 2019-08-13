<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('PAGES.ADVANCED_SEARCH.TITLE') }}</ContentHeader>

    <section class="page-section mb-5 py-5 md:py-10">
      <nav class="flex items-end border-b mx-5 sm:mx-10">
        <div
          v-for="model in models"
          :key="model"
          :class="isActiveComponent(model) ? 'active-tab' : 'inactive-tab'"
          @click="setActiveComponent(model)"
        >
          {{ $t(`COMMON.${model.toUpperCase()}S`) }}
        </div>
      </nav>

      <Component
        :is="activeComponent"
        v-if="activeComponent"
        v-bind="$attrs"
      />
    </section>

    <h2 class="text-2xl mb-5 md:mb-6 px-5 sm:hidden text-theme-text-primary">
      {{ $t('PAGES.ADVANCED_SEARCH.RESULTS') }}
    </h2>

    <section class="page-section py-5 md:py-10">
      <span class="mx-5 sm:mx-10">results</span>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { BlockSearchForm, TransactionSearchForm, WalletSearchForm } from '@/components/search'

import { find } from 'lodash'

export default {
  components: {
    BlockSearchForm,
    TransactionSearchForm,
    WalletSearchForm
  },

  data: () => ({
    models: ['Transaction', 'Block', 'Wallet'],
    activeComponent: 'TransactionSearchForm'
  }),

  mounted () {
    this.setActiveComponent('Transaction')
  },

  methods: {
    setActiveComponent (model) {
      const component = find(this.$options.components, item => item.model === model)

      if (!component) {
        throw new Error(`[Search] - Form for model '${model}' not found.`)
      }

      this.activeComponent = component.name
    },

    isActiveComponent (model) {
      return this.activeComponent.includes(model)
    }
  }
}
</script>
