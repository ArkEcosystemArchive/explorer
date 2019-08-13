import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import { HeaderLanguagesDesktop } from '@/components/header/languages'
import { useI18n } from '../../../__utils__/i18n'
import Vuex from 'vuex'
import moment from 'moment'

describe('Components > Header > Languages', () => {
  let wrapper
  let dispatchMock

  const localVue = createLocalVue()
  localVue.use(Vuex)

  const i18n = useI18n(localVue)

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          headerType: 'currencies',
          nightMode: false,
          language: 'en-GB'
        },
        getters: {
          headerType: () => 'languages',
          nightMode: () => false,
          language: () => 'en-GB'
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
    i18n.locale = 'en-GB'
    moment.locale('en-GB')

    expect(i18n.locale).not.toBe('it-IT')
    expect(moment.locale()).not.toBe('it-IT')

    wrapper.findAll('.menu-button').at(1).trigger('click')

    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, 'ui/setLanguage', 'it-IT')
    expect(dispatchMock).toHaveBeenNthCalledWith(2, 'ui/setLocale', 'it-IT')
    expect(dispatchMock).toHaveBeenNthCalledWith(3, 'ui/setHeaderType', null)
    expect(i18n.locale).toBe('it-IT')
  })

  it('should be possible to close language menu on desktop', () => {
    wrapper.find('.close-button').trigger('click')

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith('ui/setHeaderType', null)
  })
})
