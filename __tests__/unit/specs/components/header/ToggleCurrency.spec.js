import { mount, createLocalVue } from '@vue/test-utils'
import NetworkMixin from '@/mixins/network'
import CurrencyMixin from '@/mixins/currency'

import ToggleCurrency from '@/components/header/toggles/ToggleCurrency'
import { useI18n } from '../../../__utils__/i18n'
import Vuex from 'vuex'

describe('Components > Header > ToggleCurrency', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const i18n = useI18n(localVue)

  const uiAction = { setHeaderType: jest.fn() }

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: { headerType: null },
        actions: uiAction,
        getters: { headerType: () => null }
      },
      currency: {
        namespaced: true,
        state: {
          name: 'USD',
          rate: 1.5
        },
        getters: {
          name: () => 'USD',
          rate: () => 1.5
        }
      }
    },
    strict: true
  })

  it('should be possible to toggle the currency', () => {
    const wrapper = mount(ToggleCurrency, {
      i18n,
      localVue,
      mixins: [CurrencyMixin, NetworkMixin],
      store
    })
    wrapper.find('button').trigger('click')
    expect(uiAction.setHeaderType).toHaveBeenCalled()
  })
})
