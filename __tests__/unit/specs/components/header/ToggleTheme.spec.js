import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import ToggleTheme from '@/components/header/toggles/ToggleTheme'
import { useI18n } from '../../../__utils__/i18n'
import Vuex from 'vuex'

describe('Components > Header > ToggleTheme', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const i18n = useI18n(localVue)

  const uiAction = { setNightMode: jest.fn() }

  it('should be possible to toggle the theme (nightmode)', () => {
    const store = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          actions: uiAction,
          getters: { nightMode: () => true }
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

  it('should be possible to toggle the theme (daymode)', () => {
    const store = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          actions: uiAction,
          getters: { nightMode: () => false }
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
