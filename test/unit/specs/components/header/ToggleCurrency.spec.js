import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import ToggleCurrency from '@/components/header/ToggleCurrency'
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

const uiAction = { setHeaderType: jest.fn() }

const store = new Vuex.Store({
  modules: {
    ui: {
      namespaced: true,
      state: { headerType: null },
      actions: uiAction,
      getters: { headerType: state => null }
    },
    currency: {
      namespaced: true,
      state: {
        name: 'USD',
        rate: 1.5
      },
      getters: {
        name: state => 'USD',
        rate: state => 1.5
      }
    }
  },
  strict: true
})

describe('header/ToggleCurrency', () => {
  it('Should be possible to toggle the currency', () => {
    const wrapper = mount(ToggleCurrency, {
      i18n,
      localVue,
      mixins,
      store
    })
    wrapper.find('button').trigger('click')
    expect(uiAction.setHeaderType).toHaveBeenCalled()
  })
})
