import mixins from '@/mixins'

const displayCurrency = function(value) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

describe('readable currency mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableCurrency(100000000, null, 'BTC')).toEqual('1')
    expect(mixins.readableCurrency(1000000000, null, 'BTC')).toEqual('10')
    expect(mixins.readableCurrency(10000000000, null, 'BTC')).toEqual('100')
    expect(mixins.readableCurrency(100000000000, null, 'BTC')).toEqual(Number(1000).toLocaleString())
  })

  it('should format currency with 2 decimals', () => {
    expect(mixins.readableCurrency(10, 1, 'eur', false)).toEqual(displayCurrency(10))
    expect(mixins.readableCurrency(10.3, 1, 'eur', false)).toEqual(displayCurrency(10.30))
    expect(mixins.readableCurrency(10.34, 1, 'eur', false)).toEqual(displayCurrency(10.34))
    expect(mixins.readableCurrency(10.349, 1, 'eur', false)).toEqual(displayCurrency(10.35))
  })
})
