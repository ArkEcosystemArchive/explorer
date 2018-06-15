import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import mixins from '@/mixins'

import delegate from '@/components/wallet/Delegate'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'

const localVue = createLocalVue()
localVue.use(VueI18n)
localVue.use(Vuex)
localVue.use(VTooltip, { defaultHtml: false })

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

describe('wallet/Delegate', () => {
  it('Should show the delegate info', () => {
    const wrapper = mount(delegate, {
      i18n,
      localVue,
      mixins,
      stubs: {
        RouterLinkStub
      },
      propsData: {
        wallet: { publicKey: '02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b' }
      }
    })
    const divs = wrapper.findAll('div.list-row-border-b')
    expect(divs).toHaveLength(6)
    expect(divs.at(0).text()).toBe('Delegate')
    expect(divs.at(1).text()).toContain('Uptime')
    expect(divs.at(2).text()).toBe('Rank/Status')
    expect(divs.at(3).text()).toContain('Approval')
    expect(divs.at(4).text()).toBe('Forged')
    expect(divs.at(5).text()).toBe('Blocks')
  })
})
