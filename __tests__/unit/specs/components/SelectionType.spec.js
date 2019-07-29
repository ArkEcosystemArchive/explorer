import { mount, createLocalVue } from '@vue/test-utils'

import SelectionType from '@/components/SelectionType'
import clickOutside from '@/directives/click-outside'
import VueI18n from 'vue-i18n'

describe('Components > SelectionType', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)
  localVue.directive('click-outside', clickOutside)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  it('should be possible to open and close the dropdown', () => {
    const wrapper = mount(SelectionType, {
      i18n,
      localVue,
      clickOutside
    })

    wrapper.find('.mr-1').trigger('click')
    expect(wrapper.findAll('ul').at(1).isVisible()).toBeTruthy()

    wrapper.find('.mr-1').trigger('click')
    expect(wrapper.findAll('ul').at(1).isVisible()).toBeFalsy()
  })

  it('should close the dropdown after selecting a type', () => {
    const wrapper = mount(SelectionType, {
      i18n,
      localVue,
      clickOutside
    })

    wrapper.setData({ selectOpen: true })
    wrapper.findAll('.dropdown-button').at(11).trigger('click')
    expect(wrapper.vm.selectOpen).toBeFalsy()
  })

  it('should save the selected type to localStorage', () => {
    const wrapper = mount(SelectionType, {
      i18n,
      localVue,
      clickOutside
    })

    wrapper.findAll('.dropdown-button').at(11).trigger('click')
    expect(localStorage.setItem).toHaveBeenCalledWith('transactionType', 4)
    expect(Number(localStorage.__STORE__['transactionType'])).toBe(4)
  })
})
