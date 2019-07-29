import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import ToggleChart from '@/components/header/toggles/ToggleChart'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('Components > Header > ToggleChart', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.use(Vuex)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const uiAction = { setPriceChart: jest.fn() }

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: { priceChart: false },
        actions: uiAction,
        getters: { priceChart: () => false }
      }
    },
    strict: true
  })

  it('should be possible to toggle the chart', () => {
    const wrapper = mount(ToggleChart, {
      i18n,
      localVue,
      mixins,
      store
    })

    wrapper.find('button').trigger('click')
    expect(uiAction.setPriceChart).toHaveBeenCalled()
  })
})
