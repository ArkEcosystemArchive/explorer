import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import mixins from '@/mixins'
import store from '@/store'

import Wallet from '@/components/links/Wallet'
import VueI18n from 'vue-i18n'

const localVue = createLocalVue()
localVue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

const testAddress = 'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv'
const testPublicKey = '021d03bace0687a1a5e797f884b13fb46f817ec32de1374a7f223f24404401d220'
const testDelegateAddress = 'ALgvTAoz5Vi9easHqBK6aEMKatHb4beCXm'
const testDelegatePublicKey = '03aa4863c93d170d89675a6e381d08a451c1067fc0f6fed479571d9ecb178963b3'

describe('Link/Wallet', () => {
  it('Should display a full link to a wallet', () => {
    const wrapper = mount(Wallet, {
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0,
        trunc: false
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.text()).toEqual(expect.stringContaining(testAddress))
    expect(wrapper.text()).toEqual(expect.stringContaining(mixins.truncate(testAddress)))
  })

  it('Should display a truncated link to a wallet', () => {
    const wrapper = mount(Wallet, {
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress))
    expect(wrapper.text()).toEqual(expect.stringContaining(mixins.truncate(testAddress)))
  })

  it('Should display the name of a known address', () => {
    store.dispatch('network/setKnownWallets', { 'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv': 'TestKnownWallet' })
    const wrapper = mount(Wallet, {
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress))
    expect(wrapper.text()).not.toEqual(expect.stringContaining(mixins.truncate(testAddress)))
    expect(wrapper.text()).toEqual(expect.stringContaining('TestKnownWallet'))
  })

  it('Should display the name of a delegate', done => {
    store.dispatch('delegates/setDelegates', [ { username: 'TestDelegate', address: testDelegateAddress, publicKey: testDelegatePublicKey } ])
    const wrapper = mount(Wallet, {
      propsData: {
        address: testDelegateAddress,
        type: 0
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins,
      store
    })
    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress))
      expect(wrapper.text()).not.toEqual(expect.stringContaining(mixins.truncate(testDelegateAddress)))
      expect(wrapper.text()).toEqual(expect.stringContaining('TestDelegate'))
      done()
    }, 500)
  })

  it('Should also find the delegate by public key', done => {
    store.dispatch('delegates/setDelegates', [ { username: 'TestDelegate', address: testDelegateAddress, publicKey: testDelegatePublicKey } ])
    const wrapper = mount(Wallet, {
      propsData: {
        publicKey: testDelegatePublicKey,
        type: 0
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins,
      store
    })
    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress))
      expect(wrapper.text()).not.toEqual(expect.stringContaining(mixins.truncate(testDelegateAddress)))
      expect(wrapper.text()).toEqual(expect.stringContaining('TestDelegate'))
      done()
    }, 500)
  })

  describe('When given a transaction type > 0', () => {
    it('Should display 2nd Signature Registration for type 1', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 1 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('2nd Signature Registration'))
    })

    it('Should display Delegate Registration for type 2', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 2 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Delegate Registration'))
    })

    it('Should display Vote for type 3', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 3 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Vote'))
    })

    it('Should display Multisignature Registration for type 4', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 4 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Multisignature Registration'))
    })

    it('Should display IPFS for type 5', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 5 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('IPFS'))
    })

    it('Should display Timelock Transfer for type 6', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 6 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Timelock Transfer'))
    })

    it('Should display Multipayment for type 7', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 7 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Multipayment'))
    })

    it('Should display Delegate Resignation for type 8', () => {
      const wrapper = mount(Wallet, {
        propsData: { type: 8 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins,
        store
      })
      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Delegate Resignation'))
    })
  })
})
