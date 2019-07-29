import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import StringsMixin from '@/mixins/strings'
import store from '@/store'

import { LinkWallet } from '@/components/links'
import VueI18n from 'vue-i18n'

describe('Compontents > Links > Wallet', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const testAddress = 'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv'
  const testPublicKey = '021d03bace0687a1a5e797f884b13fb46f817ec32de1374a7f223f24404401d220'
  const testDelegateAddress = 'ALgvTAoz5Vi9easHqBK6aEMKatHb4beCXm'
  const testDelegatePublicKey = '03aa4863c93d170d89675a6e381d08a451c1067fc0f6fed479571d9ecb178963b3'

  const delegates = [{ username: 'TestDelegate', address: testDelegateAddress, publicKey: testDelegatePublicKey }]

  it('should display a full link to a wallet', () => {
    const wrapper = mount(LinkWallet, {
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
      mixins: [StringsMixin],
      store
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.text()).toEqual(expect.stringContaining(testAddress))
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)))
  })

  it('should display a truncated link to a wallet', () => {
    const wrapper = mount(LinkWallet, {
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
      mixins: [StringsMixin],
      store
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress))
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)))
  })

  it('should display the name of a known address', () => {
    store.dispatch('network/setKnownWallets', { AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv: 'TestKnownWallet' })
    const wrapper = mount(LinkWallet, {
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
      mixins: [StringsMixin],
      store
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.findAll('svg')).toHaveLength(1)
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress))
    expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)))
    expect(wrapper.text()).toEqual(expect.stringContaining('TestKnownWallet'))
  })

  it('should display the name of a delegate', done => {
    store.dispatch('delegates/setDelegates', { delegates })
    const wrapper = mount(LinkWallet, {
      propsData: {
        address: testDelegateAddress,
        type: 0
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins: [StringsMixin],
      store
    })

    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress))
      expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testDelegateAddress)))
      expect(wrapper.text()).toEqual(expect.stringContaining('TestDelegate'))
      done()
    }, 500)
  })

  it('should also find the delegate by public key', done => {
    store.dispatch('delegates/setDelegates', { delegates })
    const wrapper = mount(LinkWallet, {
      propsData: {
        publicKey: testDelegatePublicKey,
        type: 0
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins: [StringsMixin],
      store
    })

    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(1)
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress))
      expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testDelegateAddress)))
      expect(wrapper.text()).toEqual(expect.stringContaining('TestDelegate'))
      done()
    }, 500)
  })

  describe('When given a transaction type > 0', () => {
    it('should display 2nd Signature Registration for type 1', () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 1 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('2nd Signature Registration'))
    })

    it('should display Delegate Registration for type 2', () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 2 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Delegate Registration'))
    })

    it('should display Vote for type 3', () => {
      store.dispatch('delegates/setDelegates', { delegates })

      const wrapper = mount(LinkWallet, {
        propsData: {
          type: 3,
          asset: {
            votes: ['+testDelegatePublicKey']
          }
        },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      setTimeout(() => {
        expect(wrapper.text()).toEqual(expect.stringContaining('Vote'))
      }, 500)
    })

    it('should display Multisignature Registration for type 4', () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 4 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Multisignature Registration'))
    })

    it('should display IPFS for type 5', () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 5 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('IPFS'))
    })

    it('should display Timelock Transfer for type 6', () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 6 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Timelock Transfer'))
    })

    it('should display Multipayment for type 7', () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 7 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Multipayment'))
    })

    it('should display Delegate Resignation for type 8', () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 8 },
        stubs: {
          RouterLink: RouterLinkStub
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store
      })

      expect(wrapper.contains('a')).toBe(false)
      expect(wrapper.text()).toEqual(expect.stringContaining('Delegate Resignation'))
    })
  })
})
