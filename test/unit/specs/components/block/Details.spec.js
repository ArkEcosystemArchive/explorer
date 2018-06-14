import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import Details from '@/components/block/Details'
import VueI18n from 'vue-i18n'

const localVue = createLocalVue()
localVue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

describe('Block/Details', () => {
  it('Should display the block details', () => {
    const wrapper = mount(Details, {
      propsData: { block: {} },
      stubs: {
        'link-wallet': '<div></div>'
      },
      i18n,
      mixins,
      localVue,
    })
    expect(wrapper.findAll('.list-row-border-b')).toHaveLength(8)
    expect(wrapper.findAll('.list-row')).toHaveLength(1)
  })
})
