import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import BlockDetails from '@/components/block/Details'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('Components > Block > Details', () => {
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

  it('should display the block details', () => {
    const wrapper = mount(BlockDetails, {
      propsData: {
        block: {
          height: 1
        }
      },
      stubs: {
        LinkWallet: '<div></div>'
      },
      i18n,
      localVue,
      mixins,
      store
    })

    expect(wrapper.findAll('.list-row-border-b')).toHaveLength(7)
    expect(wrapper.findAll('.list-row-border-b-no-wrap')).toHaveLength(1)
    expect(wrapper.findAll('.list-row')).toHaveLength(1)
  })
})
