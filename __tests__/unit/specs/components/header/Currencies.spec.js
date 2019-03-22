import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import DesktopCurrency from '@/components/header/currencies/Desktop'
import MobileCurrency from '@/components/header/currencies/Mobile'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

// mock crypto compare service to avoid querying api
jest.mock('@/services/crypto-compare')

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
    ui: {
      namespaced: true,
      state: {
        headerType: 'currencies',
        nightMode: false
      },
      getters: {
        headerType: state => 'currencies',
        nightMode: state => false
      }
    },
    network: {
      namespaced: true,
      state: {
        currencies: {'USD': '$'},
      },
      getters: {
        currencies: state => ({'USD': '$'})
      },
    }
  },
  strict: true
})

describe('header/currencies/Desktop', () => {
  it('Should change currency with current rate', (done) => {
    const dispatchMock = jest.fn()
    store.dispatch = dispatchMock
    expect.assertions(6)

    const wrapper = mount(DesktopCurrency, {
      i18n,
      localVue,
      mixins,
      store
    })

    let el = wrapper.find('.menu-button')
    expect(el.text()).toBe('USD')
    el.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(dispatchMock).toHaveBeenCalledTimes(4)
      expect(dispatchMock).toHaveBeenNthCalledWith(1, 'currency/setName', 'USD')
      expect(dispatchMock).toHaveBeenNthCalledWith(2, 'currency/setRate', 12.34)
      expect(dispatchMock).toHaveBeenNthCalledWith(3, 'currency/setSymbol', '$')
      expect(dispatchMock).toHaveBeenNthCalledWith(4, 'ui/setHeaderType', null)
      done()
    })
  })

  it('Should be possible to close currency menu on desktop', () => {
    const dispatchMock = jest.fn()
    store.dispatch = dispatchMock

    const wrapper = mount(DesktopCurrency, {
      i18n,
      localVue,
      mixins,
      store
    })

    wrapper.find('.close-button').trigger('click')
    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith('ui/setHeaderType', null)
  })
})

describe('header/currencies/Mobile', () => {
  it('Should change currency with current rate', (done) => {
    const dispatchMock = jest.fn()
    store.dispatch = dispatchMock
    expect.assertions(6)

    const wrapper = mount(MobileCurrency, {
      i18n,
      localVue,
      mixins,
      store
    })

    let el = wrapper.find('.menu-container > li')
    expect(el.text()).toBe('USD')
    el.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(dispatchMock).toHaveBeenCalledTimes(4)
      expect(dispatchMock).toHaveBeenNthCalledWith(1, 'currency/setName', 'USD')
      expect(dispatchMock).toHaveBeenNthCalledWith(2, 'currency/setRate', 12.34)
      expect(dispatchMock).toHaveBeenNthCalledWith(3, 'currency/setSymbol', '$')
      expect(dispatchMock).toHaveBeenNthCalledWith(4, 'ui/setHeaderType', null)
      done()
    })
  })
})
