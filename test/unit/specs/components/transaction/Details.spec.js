import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import Details from '@/components/transaction/Details'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueI18n)
localVue.use(Vuex)

const i18n = new VueI18n({
  locale: 'en-gb',
  fallbackLocale: 'en-gb',
  messages: { 'en-gb': {} },
  silentTranslationWarn: true
})

const store = new Vuex.Store({
  modules: {
    network: {
      namespaced: true,
      getters: {
        height: state => 1000000
      }
    }
  },
  strict: true
})

describe('transaction/Details', () => {
  it('Should display the transaction details', () => {
    const wrapper = mount(Details, {
      propsData: {
        transaction: {
          id: 'transaction-id',
          vendorField: 'vendor-field'
        }
      },
      stubs: {
        'link-wallet': '<div></div>',
        'link-block': '<div></div>'
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.findAll('.list-row-border-b')).toHaveLength(6)
    expect(wrapper.findAll('.list-row-border-b-no-wrap')).toHaveLength(1)
    expect(wrapper.findAll('.list-row')).toHaveLength(1)
  })
})
