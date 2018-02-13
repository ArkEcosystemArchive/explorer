import mixins from '@/mixins'

describe('readable timestamp ago mixin', () => {
  it.skip('should properly format the given data', () => {
    mixins.readableTimestampAgo(22231900).should.equal('2 months ago')
  })
})
