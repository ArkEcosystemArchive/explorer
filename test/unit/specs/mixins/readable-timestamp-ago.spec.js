import moment from 'moment-timezone'
import mixins from '@/mixins'

describe('readable timestamp ago mixin', () => {
  it('should properly format the given data', () => {
    moment.tz.setDefault('America/Los_Angeles')

    mixins.readableTimestampAgo(22231900).should.equal('2 months ago')
  })
})
