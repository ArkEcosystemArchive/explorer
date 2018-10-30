import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import DesktopLanguage from '@/components/header/languages/Desktop'
import MobileLanguage from '@/components/header/languages/Mobile'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(VueI18n)
localVue.use(Vuex)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'nl': {} },
  silentTranslationWarn: true
})

const store = new Vuex.Store({
  modules: {
    ui: {
      namespaced: true,
      state: {
        headerType: 'currencies',
        nightMode: false,
        language: 'en'
      },
      getters: {
        headerType: state => 'languages',
        nightMode: state => false,
        language: state => 'en'
      }
    },
  },
  strict: true
})

describe('header/languages/Desktop', () => {
  it('Should change language', () => {
    i18n.locale = 'en'

    const dispatchMock = jest.fn()
    store.dispatch = dispatchMock

    const wrapper = mount(DesktopLanguage, {
      i18n,
      localVue,
      mixins,
      store
    })

    expect(i18n.locale).not.toBe('nl')
    wrapper.find('.menu-button').trigger('click')

    expect(dispatchMock).toHaveBeenCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, 'ui/setLanguage', 'nl')
    expect(dispatchMock).toHaveBeenNthCalledWith(2, 'ui/setHeaderType', null)
    expect(i18n.locale).toBe('nl')
  })

  it('Should be possible to close language menu on desktop', () => {
    const dispatchMock = jest.fn()
    store.dispatch = dispatchMock

    const wrapper = mount(DesktopLanguage, {
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

describe('header/languages/Mobile', () => {
  it('Should change language', () => {
    i18n.locale = 'en'

    const dispatchMock = jest.fn()
    store.dispatch = dispatchMock

    const wrapper = mount(MobileLanguage, {
      i18n,
      localVue,
      mixins,
      store
    })

    expect(i18n.locale).not.toBe('nl')
    wrapper.find('.language-menu > li').trigger('click')

    expect(dispatchMock).toHaveBeenCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, 'ui/setLanguage', 'nl')
    expect(dispatchMock).toHaveBeenNthCalledWith(2, 'ui/setHeaderType', null)
    expect(i18n.locale).toBe('nl')
  })
})
