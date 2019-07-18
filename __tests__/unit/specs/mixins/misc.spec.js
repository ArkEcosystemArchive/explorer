import { createLocalVue, shallowMount } from '@vue/test-utils'
import MiscMixin from '@/mixins/misc'
import store from '@/store'
import moment from 'moment-timezone'

describe('Mixins > Misc', () => {
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
      mixins: [MiscMixin]
    })
  })

  describe('readableTimestamp', () => {
    it('should properly format the given data', () => {
      const result = moment()
        .utc()
        .set({
          year: 2017,
          month: 11,
          date: 3,
          hour: 20,
          minute: 31,
          second: 40
        })
        .local()

      expect(wrapper.vm.readableTimestamp(1512333100)).toEqual(result.format('L LTS'))
    })
  })

  describe('readableTimestamp', () => {
    it('should properly format the given data', () => {
      expect(wrapper.vm.readableTimestampAgo(22231900, 26231900)).toEqual('2 months ago')
    })
  })

  describe('readableNumber', () => {
    it('should properly format the given data', () => {
      expect(wrapper.vm.readableNumber(1)).toEqual('1.00')
      expect(wrapper.vm.readableNumber(10)).toEqual('10.00')
      expect(wrapper.vm.readableNumber(100)).toEqual('100.00')
      expect(wrapper.vm.readableNumber(1000, 2, true)).toEqual('1000.00')
      expect(wrapper.vm.readableNumber(1234.56789, 2, true)).toEqual('1234.57')
    })

    it('should format to the specified decimals', () => {
      expect(wrapper.vm.readableNumber(1, 3)).toEqual('1.000')
      expect(wrapper.vm.readableNumber(1.23456, 3)).toEqual('1.235')
      expect(wrapper.vm.readableNumber(100, 8)).toEqual('100.00000000')
    })
  })
})
