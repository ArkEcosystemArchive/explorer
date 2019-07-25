import { shallowMount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import errorPage from '@/pages/404'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('Pages > 404', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.use(Vuex)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const uiAction = { setNightMode: jest.fn() }

  it('should show the correct image for nightmode', () => {
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

    const wrapper = shallowMount(errorPage, {
      i18n,
      localVue,
      mixins,
      store,
      stubs: {
        ContentHeader: '<div></div>'
      }
    })

    expect(wrapper.find('h1').text()).toEqual('Ooops!!')
    expect(wrapper.find('img').attributes().src).toBe('@/assets/images/404/dark.png')
  })

  it('should show the correct image for daymode', () => {
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

    const wrapper = shallowMount(errorPage, {
      i18n,
      localVue,
      mixins,
      store,
      stubs: {
        ContentHeader: '<div></div>'
      }
    })

    expect(wrapper.find('h1').text()).toEqual('Ooops!!')
    expect(wrapper.find('img').attributes().src).toBe('@/assets/images/404/light.png')
  })
})
