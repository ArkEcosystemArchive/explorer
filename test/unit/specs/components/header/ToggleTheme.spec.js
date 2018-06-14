import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import ToggleTheme from '@/components/header/ToggleTheme'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueI18n)
localVue.use(Vuex)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

const uiAction = { setNightMode: jest.fn() }

describe('header/ToggleTheme', () => {
  it('Should be possible to toggle the theme (nightmode)', () => {
    const store = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          actions: uiAction,
          getters: { nightMode: state => true }
        }
      },
      strict: true
    })

    const wrapper = mount(ToggleTheme, {
      i18n,
      localVue,
      mixins,
      store
    })
    wrapper.find('button').trigger('click')
    expect(uiAction.setNightMode).toHaveBeenCalled()

    wrapper.vm.changeImageSource()
  })

  it('Should be possible to toggle the theme (daymode)', () => {
    const store = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          actions: uiAction,
          getters: { nightMode: state => false }
        }
      },
      strict: true
    })

    const wrapper = mount(ToggleTheme, {
      i18n,
      localVue,
      mixins,
      store
    })
    wrapper.find('button').trigger('click')
    expect(uiAction.setNightMode).toHaveBeenCalled()

    wrapper.vm.changeImageSource()
  })
})
