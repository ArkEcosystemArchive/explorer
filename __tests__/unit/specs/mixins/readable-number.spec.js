import mixins from '@/mixins'

describe('readable number mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableNumber(1)).toEqual('1.00')
    expect(mixins.readableNumber(10)).toEqual('10.00')
    expect(mixins.readableNumber(100)).toEqual('100.00')
    expect(mixins.readableNumber(1000)).toEqual('1000.00')
    expect(mixins.readableNumber(1234.56789)).toEqual('1234.57')
  })

  it('should format to the specified decimals', () => {
    expect(mixins.readableNumber(1, 3)).toEqual('1.000')
    expect(mixins.readableNumber(1.23456, 3)).toEqual('1.235')
    expect(mixins.readableNumber(100, 8)).toEqual('100.00000000')
  })
})
