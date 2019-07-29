import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import mixins from '@/mixins'

import WalletDelegate from '@/components/wallet/Delegate'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('Components > Wallet > Delegate', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.use(Vuex)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const mocks = {
    $store: {
      getters: {
        'delegates/byPublicKey': publicKey => {
          return { username: '' }
        }
      }
    }
  }

  it('should show the delegate info', () => {
    const wrapper = mount(WalletDelegate, {
      i18n,
      localVue,
      mixins,
      mocks,
      stubs: {
        RouterLinkStub
      },
      propsData: {
        wallet: { publicKey: '02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b' }
      }
    })

    let divs = wrapper.findAll('div.list-row-border-b')
    expect(divs).toHaveLength(4)
    expect(divs.at(0).text()).toBe('Delegate')
    expect(divs.at(1).text()).toContain('Rank/Status')
    expect(divs.at(2).text()).toContain('Votes')
    expect(divs.at(3).text()).toBe('Forged')

    divs = wrapper.findAll('div.list-row')
    expect(divs).toHaveLength(1)
    expect(divs.at(0).text()).toBe('Blocks')
  })
})
