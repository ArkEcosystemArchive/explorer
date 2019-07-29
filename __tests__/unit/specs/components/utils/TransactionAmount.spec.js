import { mount, createLocalVue } from '@vue/test-utils'
import CurrencyMixin from '@/mixins/currency'
import store from '@/store'

import TransactionAmount from '@/components/utils/TransactionAmount'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('Components > Utils > TransactionAmount', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.use(Vuex)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const incomingAddress = 'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv'
  const outgoingAddress = 'AN7BURQn5oqBRBADeWhmmUMJGQTy5Seey3'

  beforeAll(() => {
    store.dispatch('network/setSymbol', 'Ѧ')
    store.dispatch('currency/setName', 'USD')
    store.dispatch('currency/setSymbol', '$')
  })

  it('should display an outgoing transaction in red', () => {
    const $route = {
      params: {
        address: incomingAddress
      }
    }

    const wrapper = mount(TransactionAmount, {
      propsData: {
        transaction: {
          sender: incomingAddress,
          recipient: outgoingAddress,
          amount: 100000000,
          timestamp: {
            unix: 1
          }
        },
        type: 0
      },
      mocks: {
        $route
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin],
      store
    })

    expect(wrapper.classes()).toContain('text-red')
    expect(wrapper.classes()).not.toContain('text-green')
    expect(wrapper.text()).toEqual(wrapper.vm.readableCrypto(100000000).trim())
  })

  it('should display an incoming transaction in green', () => {
    const $route = {
      params: {
        address: incomingAddress
      }
    }

    const wrapper = mount(TransactionAmount, {
      propsData: {
        transaction: {
          sender: outgoingAddress,
          recipient: incomingAddress,
          amount: 100000000,
          timestamp: {
            unix: 1
          }
        },
        type: 0
      },
      mocks: {
        $route
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin],
      store
    })

    expect(wrapper.classes()).toContain('text-green')
    expect(wrapper.classes()).not.toContain('text-red')
    expect(wrapper.text()).toEqual(wrapper.vm.readableCrypto(100000000).trim())
  })

  it('should display special transactions in red', () => {
    const $route = {
      params: {
        address: incomingAddress
      }
    }

    const wrapper = mount(TransactionAmount, {
      propsData: {
        transaction: {
          sender: incomingAddress,
          recipient: incomingAddress,
          amount: 100000000,
          timestamp: {
            unix: 1
          }
        },
        type: 1
      },
      mocks: {
        $route
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin],
      store
    })

    expect(wrapper.classes()).toContain('text-red')
    expect(wrapper.classes()).not.toContain('text-green')
    expect(wrapper.text()).toEqual(wrapper.vm.readableCrypto(100000000).trim())
  })
})
