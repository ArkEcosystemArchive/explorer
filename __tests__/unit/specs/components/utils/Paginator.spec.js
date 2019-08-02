import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'
import store from '@/store'

import Paginator from '@/components/utils/Paginator'
import { useI18n } from '../../../../__utils__/i18n'
import Vuex from 'vuex'

describe('Components > Utils > Paginator', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const i18n = useI18n(localVue)

  it('should display a paginator component', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        meta: {
          pageCount: 2,
          self: '1',
          first: '1',
          last: '2',
          previous: null,
          next: '2'
        },
        currentPage: 1
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const buttonTexts = wrapper.findAll('button > span')
    expect(buttonTexts).toHaveLength(6)
    expect(buttonTexts.at(0).text()).toEqual('First')
    expect(buttonTexts.at(1).text()).toEqual('Previous')
    expect(buttonTexts.at(4).text()).toEqual('Next')
    expect(buttonTexts.at(5).text()).toEqual('Last')
  })

  it('should disable the previous and first buttons if no previous page', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        meta: {
          pageCount: 1,
          self: '1',
          first: '1',
          last: '1',
          previous: null,
          next: null
        },
        currentPage: 1
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(5)
    expect(buttons.at(0).classes()).toContain('disabled')
    expect(buttons.at(1).classes()).toContain('disabled')
  })

  it('should disable the next and last buttons if no next page', () => {
    const wrapper = mount(Paginator, {
      propsData: {
        meta: {
          pageCount: 1,
          self: '1',
          first: '1',
          last: '1',
          previous: null,
          next: null
        },
        currentPage: 1
      },
      i18n,
      localVue,
      mixins,
      store
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(5)
    expect(buttons.at(3).classes()).toContain('disabled')
    expect(buttons.at(4).classes()).toContain('disabled')
  })
})
