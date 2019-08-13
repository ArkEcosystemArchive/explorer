import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import ToggleLanguage from '@/components/header/toggles/ToggleLanguage'
import { useI18n } from '../../../__utils__/i18n'
import Vuex from 'vuex'

describe('Components > Header > ToggleLanguage', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const i18n = useI18n(localVue)

  const uiAction = { setHeaderType: jest.fn() }

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          language: 'en-GB',
          headerType: null
        },
        actions: uiAction,
        getters: {
          language: () => 'en-GB',
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
