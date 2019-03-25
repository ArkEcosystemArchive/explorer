import mixins from '@/mixins'

describe('readable timestamp ago mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableTimestampAgo(22231900, 26231900)).toEqual('2 months ago')
  })
})
