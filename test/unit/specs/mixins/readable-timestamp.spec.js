import mixins from '@/mixins'
import moment from 'moment-timezone'

describe('readable timestamp mixin', () => {
  it('should properly format the given data', () => {
    const result = moment()
      .utc()
      .set({
        year: 2017,
        month: 11,
        date: 3,
        hour: 20,
        minute: 31,
        second: 40,
      })
      .local()

    expect(mixins.readableTimestamp(22231900)).toEqual(result.format('L LTS'))
  })
})
