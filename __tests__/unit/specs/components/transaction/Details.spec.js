import { mount, createLocalVue } from '@vue/test-utils'
import CurrencyMixin from '@/mixins/currency'
import StringsMixin from '@/mixins/strings'

import TransactionDetails from '@/components/transaction/Details'
import { useI18n } from '../../../__utils__/i18n'
import Vuex from 'vuex'

describe('Components > Transaction > Details', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const i18n = useI18n(localVue)

  const store = new Vuex.Store({
    modules: {
      network: {
        namespaced: true,
        getters: {
          height: () => 1000000
        }
      },
      currency: {
        namespaced: true,
        getters: {
          symbol: () => '$'
        }
      }
    },
    strict: true
  })

  it('should display the transaction details', () => {
    const wrapper = mount(TransactionDetails, {
      propsData: {
        transaction: {
          id: 'transaction-id',
          vendorField: 'vendor-field'
        }
      },
      stubs: {
        LinkWallet: '<div></div>',
        LinkBlock: '<div></div>'
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin, StringsMixin],
      store
    })
    expect(wrapper.findAll('.list-row-border-b')).toHaveLength(5)
    expect(wrapper.findAll('.list-row-border-b-no-wrap')).toHaveLength(2)
    expect(wrapper.findAll('.list-row')).toHaveLength(1)
  })
})
