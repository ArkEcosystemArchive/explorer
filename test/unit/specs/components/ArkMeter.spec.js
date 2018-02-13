import { mount } from '@vue/test-utils'
import ArkMeter from '@/components/ArkMeter'

describe('ArkMeter', () => {
  context('when percentage is 0%', () => {
    it('the arc with colour should be hidden', () => {
      const wrapper = mount(ArkMeter, { propsData: { percentage: 0 } })
      wrapper.findAll('circle').length.should.equal(1)
    })
  })

  context('when percentage is bigger than 0%', () => {
    it('the arc with colour should be visible', () => {
      const wrapper = mount(ArkMeter, { propsData: { percentage: 50 } })
      wrapper.findAll('circle').length.should.equal(2)
    })
  })
})
