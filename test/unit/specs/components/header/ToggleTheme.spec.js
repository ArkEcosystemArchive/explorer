import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
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

const store = new Vuex.Store({
  modules: {
    ui: {
      namespaced: true,
      state: { nightMode: false },
      actions: uiAction,
      getters: { nightMode: state => state.nightMode }
    }
  },
  strict: true
})

describe('header/ToggleTheme', () => {
  it('Should be possible to toggle the theme', () => {

    const wrapper = mount(ToggleTheme, {
      i18n,
      localVue,
      mixins,
      store
    })
    wrapper.find('button').trigger('click')
    expect(uiAction.setNightMode).toHaveBeenCalled()
  })

})
