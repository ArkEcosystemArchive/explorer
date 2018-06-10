import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
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

const actions = {
  'ui/setHeaderType': jest.fn()
}

const store = new Vuex.Store({
  modules: {
    ui: {
      state: {
        ui: {
          headerType: () => null
        },
      },
      actions,
      getters: {
        headerType: () => null
      }
    }
  }
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
    expect(actions['ui/setHeaderType']).toHaveBeenCalled()
  })

})
