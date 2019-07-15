import { createLocalVue, shallowMount } from '@vue/test-utils'
import NetworkMixin from '@/mixins/network'
import store from '@/store'

describe('Mixins > Network', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()

    const TestComponent = {
      name: 'TestComponent',
      template: '<div />'
    }

    wrapper = shallowMount(TestComponent, {
      localVue,
      store,
      mixins: [NetworkMixin]
    })
  })

  describe('networkToken', () => {
    it('Should return the set network token', () => {
      store.dispatch('network/setToken', 'ARK')
      expect(wrapper.vm.networkToken()).toEqual('ARK')
    })

    it('Should return the default network token', () => {
      store.dispatch('network/setToken', null)
      store.dispatch('network/setDefaults', { token: 'DEFAULTARK' })
      expect(wrapper.vm.networkToken()).toEqual('DEFAULTARK')
    })
    it('Should return an empty string if no token has been set', () => {
      store.dispatch('network/setDefaults', {})
      expect(wrapper.vm.networkToken()).toEqual('')
    })
  })
})
