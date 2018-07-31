import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import store from '@/store'

import Paginator from '@/components/utils/Paginator'
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

describe('Utils/Paginator', () => {
  it('Should display a paginator component', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        start: 1
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const buttonTexts = wrapper.findAll('button > span')
    expect(buttonTexts).toHaveLength(2)
    expect(buttonTexts.at(0).text()).toEqual('Previous')
    expect(buttonTexts.at(1).text()).toEqual('Next')
  })

  it('Should not show previous if no previous page', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        start: 1
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons.at(0).classes()).toContain('hidden')
    expect(buttons.at(1).classes()).not.toContain('hidden')
  })

  it('Should not show next if no next page', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        start: 1,
        perPage: 25,
        count: 25
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons.at(0).classes()).toContain('hidden')
    expect(buttons.at(1).classes()).toContain('hidden')
  })

  it('Should emit event if pressing previous or next page', () => {
    const parentWrapper = mount(Paginator, {
      propsData: {
        start: 1
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const wrapper = mount(Paginator, {
      propsData: {
        start: 1
      },
      i18n,
      localVue,
      mixins,
      store
    })
    wrapper.vm.$parent = parentWrapper.vm
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)

    buttons.at(1).trigger('click') // Next
    expect(parentWrapper.emitted().paginatorChanged).toBeTruthy()
    expect(parentWrapper.emitted().paginatorChanged.length).toBe(1)
    expect(parentWrapper.emitted().paginatorChanged[0]).toEqual([2])

    buttons.at(0).trigger('click') // Previous
    expect(parentWrapper.emitted().paginatorChanged.length).toBe(2)
    expect(parentWrapper.emitted().paginatorChanged[1]).toEqual([1])

    buttons.at(0).trigger('click') // Previous
    expect(parentWrapper.emitted().paginatorChanged.length).toBe(3)
    expect(parentWrapper.emitted().paginatorChanged[2]).toEqual([1])
  })
})
