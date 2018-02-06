import mixins from '@/mixins'

describe('readable number mixin', () => {
  it('should properly format the given data', () => {
    mixins.readableNumber(1).should.equal('1.00')
    mixins.readableNumber(10).should.equal('10.00')
    mixins.readableNumber(100).should.equal('100.00')
    mixins.readableNumber(1000).should.equal('1000.00')
  })
})
