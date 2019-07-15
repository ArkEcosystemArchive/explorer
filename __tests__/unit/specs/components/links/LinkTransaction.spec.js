import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import StringsMixin from '@/mixins/strings'
import store from '@/store'

import { LinkTransaction } from '@/components/links'
import VueI18n from 'vue-i18n'

describe('Components > Links > Transaction', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const testTransaction = '1b245c4f1a449da655a43e8b804ed635cc8d1cc6fb50c062d2c00ac126845e40'

  it('Should display a truncated link to a transaction', () => {
    const wrapper = mount(LinkTransaction, {
      propsData: {
        id: testTransaction
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins: [StringsMixin],
      store
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.findAll('svg')).toHaveLength(0)
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testTransaction)))
  })

  it('Should display a smartbridge icon if transaction contains one', () => {
    const wrapper = mount(LinkTransaction, {
      propsData: {
        id: testTransaction,
        smartBridge: 'Hello',
        showSmartBridgeIcon: true
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins: [StringsMixin],
      store
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.findAll('svg')).toHaveLength(1)
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testTransaction)))
  })

  it('Should not display a smartbridge icon if set to false', () => {
    const wrapper = mount(LinkTransaction, {
      propsData: {
        id: testTransaction,
        smartBridge: 'Hello',
        showSmartBridgeIcon: false
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins: [StringsMixin],
      store
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.findAll('svg')).toHaveLength(0)
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testTransaction)))
  })
})
