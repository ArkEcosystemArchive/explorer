import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import { HeaderLanguagesDesktop } from '@/components/header/languages'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import moment from 'moment'

describe('Components > Header > Languages', () => {
  let wrapper
  let dispatchMock

  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.use(Vuex)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { nl: {} },
    silentTranslationWarn: true
  })

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          headerType: 'currencies',
          nightMode: false,
          language: 'en-gb'
        },
        getters: {
          headerType: () => 'languages',
          nightMode: () => false,
          language: () => 'en-gb'
        }
      }
    },
    strict: true
  })

  beforeEach(() => {
    dispatchMock = jest.fn()
    store.dispatch = dispatchMock

    wrapper = mount(HeaderLanguagesDesktop, {
      i18n,
      localVue,
      mixins,
      store
    })
  })

  it('should change language', () => {
    i18n.locale = 'en-gb'
    moment.locale('en-gb')

    expect(i18n.locale).not.toBe('nl')
    expect(moment.locale()).not.toBe('nl')

    wrapper.find('.menu-button').trigger('click')

    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, 'ui/setLanguage', 'nl')
    expect(dispatchMock).toHaveBeenNthCalledWith(2, 'ui/setLocale', 'nl')
    expect(dispatchMock).toHaveBeenNthCalledWith(3, 'ui/setHeaderType', null)
    expect(i18n.locale).toBe('nl')
  })

  it('should be possible to close language menu on desktop', () => {
    wrapper.find('.close-button').trigger('click')

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith('ui/setHeaderType', null)
  })
})
