import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import ToggleChart from '@/components/header/ToggleChart'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueI18n)
localVue.use(Vuex)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

const uiAction = { setPriceChart: jest.fn() }

const store = new Vuex.Store({
  modules: {
    ui: {
      namespaced: true,
      state: { priceChart: false },
      actions: uiAction,
      getters: { priceChart: state => false }
    }
  },
  strict: true
})

describe('header/ToggleChart', () => {
  it('Should be possible to toggle the chart', () => {
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
