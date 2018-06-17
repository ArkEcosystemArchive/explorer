import { shallowMount } from '@vue/test-utils'
import Loader from '@/components/utils/Loader'

// Fails to import Loader, due to the PulseLoader.vue dependency
describe('Utils/Currency', () => {
  it('Should display a currency amount', () => {
    const wrapper = shallowMount(Loader, {
      propsData: {
        data: null
      }
    })
    console.log(wrapper.html())
    // TODO; tests
  })
})
