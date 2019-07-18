import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import StringsMixin from '@/mixins/strings'
import store from '@/store'

import { LinkBlock } from '@/components/links'
import VueI18n from 'vue-i18n'

describe('Components > Links > Block', () => {
  const localVue = createLocalVue()
  localVue.use(VueI18n)

  const i18n = new VueI18n({
    locale: 'en-gb',
    fallbackLocale: 'en-gb',
    messages: { 'en-gb': {} },
    silentTranslationWarn: true
  })

  const testBlock = '8900581355787753944'

  it('should display a truncated link to a block', () => {
    const wrapper = mount(LinkBlock, {
      propsData: {
        id: testBlock
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      i18n,
      localVue,
      mixins: [StringsMixin],
      store
    })
    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testBlock)))
  })
})
