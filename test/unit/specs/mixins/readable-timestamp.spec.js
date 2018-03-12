import mixins from '@/mixins'

describe('readable timestamp mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableTimestamp(22231900, 0)).toEqual('03.12.2017 20:31:40')
  })
})
