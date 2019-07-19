import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import ToggleLanguage from '@/components/header/toggles/ToggleLanguage'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('Components > Header > ToggleLanguage', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.use(Vuex)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const uiAction = { setHeaderType: jest.fn() }

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          language: 'en-gb',
          headerType: null
        },
        actions: uiAction,
        getters: {
          language: () => 'en-gb',
          headerType: () => null
        }
      }
    },
    strict: true
  })

  it('should be possible to show language list', () => {
    const wrapper = mount(ToggleLanguage, {
      i18n,
      localVue,
      mixins,
      store
    })

    wrapper.find('button').trigger('click')
    expect(uiAction.setHeaderType).toHaveBeenCalled()
  })
})
