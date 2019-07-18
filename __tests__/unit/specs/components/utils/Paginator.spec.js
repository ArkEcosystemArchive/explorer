import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import store from '@/store'

import Paginator from '@/components/utils/Paginator'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

describe('Components > Utils > Paginator', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.use(Vuex)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  it('should display a paginator component', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        previous: 'previous',
        next: 'next'
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

  it('should not show previous if no previous page', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        previous: null,
        next: 'next'
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

  it('should not show next if no next page', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        previous: 'previous',
        next: null
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons.at(0).classes()).not.toContain('hidden')
    expect(buttons.at(1).classes()).toContain('hidden')
  })

  it('should emit event if pressing previous or next page', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        previous: 'previous',
        next: 'next'
      },
      i18n,
      localVue,
      mixins,
      store
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)

    buttons.at(1).trigger('click') // Next
    expect(wrapper.emitted().next).toBeTruthy()

    buttons.at(0).trigger('click') // Previous
    expect(wrapper.emitted().previous).toBeTruthy()
  })
})
