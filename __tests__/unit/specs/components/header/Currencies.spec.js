import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import { HeaderCurrenciesDesktop, HeaderCurrenciesMobile } from '@/components/header/currencies'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

// mock crypto compare service to avoid querying api
jest.mock('@/services/crypto-compare')

describe('Components > Header > Currencies', () => {
  let wrapper
  let dispatchMock

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
          headerType: () => 'currencies',
          nightMode: () => false
        }
      },
      network: {
        namespaced: true,
        state: {
          currencies: { USD: '$' }
        },
        getters: {
          currencies: () => ({ USD: '$' })
        }
      }
    },
    strict: true
  })

  describe('Desktop', () => {
    beforeEach(() => {
      dispatchMock = jest.fn()
      store.dispatch = dispatchMock

      wrapper = mount(HeaderCurrenciesDesktop, {
        i18n,
        localVue,
        mixins,
        store
      })
    })

    it('should change currency with current rate', (done) => {
      expect.assertions(6)

      const el = wrapper.find('.menu-button')
      expect(el.text()).toBe('USD')
      el.trigger('click')

      wrapper.vm.$nextTick(() => {
        expect(dispatchMock).toHaveBeenCalledTimes(4)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, 'ui/setHeaderType', null)
        expect(dispatchMock).toHaveBeenNthCalledWith(2, 'currency/setName', 'USD')
        expect(dispatchMock).toHaveBeenNthCalledWith(3, 'currency/setRate', 12.34)
        expect(dispatchMock).toHaveBeenNthCalledWith(4, 'currency/setSymbol', '$')
        done()
      })
    })

    it('should be possible to close currency menu on desktop', () => {
      wrapper.find('.close-button').trigger('click')
      expect(dispatchMock).toHaveBeenCalledTimes(1)
      expect(dispatchMock).toHaveBeenCalledWith('ui/setHeaderType', null)
    })
  })

  describe('Mobile', () => {
    beforeEach(() => {
      dispatchMock = jest.fn()
      store.dispatch = dispatchMock

      wrapper = mount(HeaderCurrenciesMobile, {
        i18n,
        localVue,
        mixins,
        store
      })
    })

    it('should change currency with current rate', (done) => {
      expect.assertions(6)

      const el = wrapper.find('.menu-container > li')
      expect(el.text()).toBe('USD')
      el.trigger('click')

      wrapper.vm.$nextTick(() => {
        expect(dispatchMock).toHaveBeenCalledTimes(4)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, 'ui/setHeaderType', null)
        expect(dispatchMock).toHaveBeenNthCalledWith(2, 'currency/setName', 'USD')
        expect(dispatchMock).toHaveBeenNthCalledWith(3, 'currency/setRate', 12.34)
        expect(dispatchMock).toHaveBeenNthCalledWith(4, 'currency/setSymbol', '$')
        done()
      })
    })
  })
})
