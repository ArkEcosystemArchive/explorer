import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import mixins from '@/mixins'
import store from '@/store'

import Transaction from '@/components/links/Transaction'
import VueI18n from 'vue-i18n'

const localVue = createLocalVue()
localVue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

const testTransaction = '1b245c4f1a449da655a43e8b804ed635cc8d1cc6fb50c062d2c00ac126845e40'

describe('Link/Transaction', () => {
  it('Should display a truncated link to a transaction', () => {
    const wrapper = mount(Transaction, {
      propsData: {
        id: testTransaction
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.findAll('svg')).toHaveLength(0)
    expect(wrapper.text()).toEqual(expect.stringContaining(mixins.truncate(testTransaction)))
  })

  it('Should display a smartbridge icon if transaction contains one', () => {
    const wrapper = mount(Transaction, {
      propsData: {
        id: testTransaction,
        smartBridge: 'Hello',
        showSmartBridgeIcon: true
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.findAll('svg')).toHaveLength(1)
    expect(wrapper.text()).toEqual(expect.stringContaining(mixins.truncate(testTransaction)))
  })

  it('Should not display a smartbridge icon if set to false', () => {
    const wrapper = mount(Transaction, {
      propsData: {
        id: testTransaction,
        smartBridge: 'Hello',
        showSmartBridgeIcon: false
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.findAll('svg')).toHaveLength(0)
    expect(wrapper.text()).toEqual(expect.stringContaining(mixins.truncate(testTransaction)))
  })
})
