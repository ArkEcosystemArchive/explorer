import mixins from '@/mixins'

describe('readable currency mixin', () => {
  it('should properly format the given data', () => {
    mixins.readableCurrency(100000000).should.equal('1')
    mixins.readableCurrency(1000000000).should.equal('10')
    mixins.readableCurrency(10000000000).should.equal('100')
    mixins.readableCurrency(100000000000).should.equal('1000')
  })
})
