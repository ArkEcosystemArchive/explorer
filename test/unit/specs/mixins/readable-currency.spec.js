import mixins from '@/mixins'

describe('readable currency mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableCurrency(100000000)).toEqual('1')
    expect(mixins.readableCurrency(1000000000)).toEqual('10')
    expect(mixins.readableCurrency(10000000000)).toEqual('100')
    expect(mixins.readableCurrency(100000000000)).toEqual('1,000')
  })
})
