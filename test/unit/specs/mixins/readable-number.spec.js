import mixins from '@/mixins'

describe('readable number mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableNumber(1)).toEqual('1.00')
    expect(mixins.readableNumber(10)).toEqual('10.00')
    expect(mixins.readableNumber(100)).toEqual('100.00')
    expect(mixins.readableNumber(1000)).toEqual('1000.00')
  })
})
