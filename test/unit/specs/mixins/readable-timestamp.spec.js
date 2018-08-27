import mixins from '@/mixins'

describe('readable timestamp mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableTimestamp(22231900, 0)).toEqual('12/03/2017 8:31:40 PM')
  })
})
