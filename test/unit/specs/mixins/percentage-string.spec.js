import mixins from '@/mixins'

describe('percentageString mixin', () => {
  it('should return dash when value is undefined', () => {
    expect(mixins.percentageString(undefined)).toEqual('-')
    expect(mixins.percentageString(undefined, 0)).toEqual('-')
  })

  it('should return value with percentage sign', () => {
    expect(mixins.percentageString(10)).toEqual(Number(10).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%')
    expect(mixins.percentageString(10.1234)).toEqual(Number(10.12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%')
    expect(mixins.percentageString(10, 3)).toEqual(Number(10).toLocaleString(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3}) + '%')
    expect(mixins.percentageString(101.2345, 5)).toEqual(Number(101.2345).toLocaleString(undefined, {minimumFractionDigits: 5, maximumFractionDigits: 5}) + '%')
  })
})
