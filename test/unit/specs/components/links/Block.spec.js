import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import mixins from '@/mixins'
import store from '@/store'

import Block from '@/components/links/Block'
import VueI18n from 'vue-i18n'

const localVue = createLocalVue()
localVue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

const testBlock = '8900581355787753944'

describe('Link/Block', () => {
  it('Should display a truncated link to a block', () => {
    const wrapper = mount(Block, {
      propsData: {
        id: testBlock
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.text()).toEqual(expect.stringContaining(mixins.truncate(testBlock)))
  })
})
