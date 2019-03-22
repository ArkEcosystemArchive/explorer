import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import DesktopMenu from '@/components/header/menu/Desktop'
import MobileMenu from '@/components/header/menu/Mobile'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import router from '@/router/index'

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
        menuVisible: true,
        nightMode: false
      },
      getters: {
        menuVisible: state => true,
        nightMode: state => false
      },
      actions: {
        setMenuVisible: jest.fn()
      }
    },
  },
  strict: true
})

describe('header/menu/Desktop', () => {
  it('Should be possible to click on menu option', () => {
    const pushMock = jest.fn(params => {
      return 'name' in params && name.length > 0
    })
    router.push = pushMock

    const wrapper = mount(DesktopMenu, {
      i18n,
      localVue,
      mixins,
      store,
      router
    })

    const items = wrapper.findAll('.menu-button')
    for (let i = 0; i < items.length; ++i) {
      items.at(i).trigger('click')
      expect(pushMock).toHaveBeenCalledTimes(i + 1)
      expect(pushMock).toHaveLastReturnedWith(true)
    }
  })

  it('Should be possible to close menu on desktop', () => {
    const dispatchMock = jest.fn()
    store.dispatch = dispatchMock

    const wrapper = mount(DesktopMenu, {
      i18n,
      localVue,
      mixins,
      store,
      router
    })

    wrapper.find('div > button:not(.menu-button)').trigger('click')
    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith('ui/setMenuVisible', false)
  })
})

describe('header/menu/Mobile', () => {
  it('Should be possible to click on menu option', () => {
    const pushMock = jest.fn(params => {
      return 'name' in params
    })
    router.push = pushMock

    const wrapper = mount(MobileMenu, {
      i18n,
      localVue,
      mixins,
      store,
      router
    })

    const items = wrapper.findAll('.menu-container > li > div')
    for (let i = 0; i < items.length; ++i) {
      items.at(i).trigger('click')
      expect(pushMock).toHaveBeenCalledTimes(i + 1)
      expect(pushMock).toHaveLastReturnedWith(true)
    }
  })
})
