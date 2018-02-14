import moment from 'moment-timezone'
import mixins from '@/mixins'

describe('readable timestamp mixin', () => {
  it('should properly format the given data', () => {
    moment.tz.setDefault('America/Los_Angeles')

    mixins.readableTimestamp(22231900).should.equal('03.12.2017 22:31:40')
  })
})
