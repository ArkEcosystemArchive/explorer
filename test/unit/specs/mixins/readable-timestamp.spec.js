import mixins from '@/mixins'

describe('readable timestamp mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableTimestamp(22231900)).toEqual('03.12.2017 22:31:40')
  })
})
