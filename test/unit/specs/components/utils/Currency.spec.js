import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import store from '@/store'

import Currency from '@/components/utils/Currency'
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

describe('Utils/Currency', () => {
  it('Should display a currency amount', () => {
    const wrapper = mount(Currency, {
      propsData: {
        amount: 1012345678
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('span')).toBe(true)
    expect(wrapper.findAll('span')).toHaveLength(1)
    expect(wrapper.text()).toEqual(mixins.readableCurrency(1012345678) + ' Ѧ')
  })
})
