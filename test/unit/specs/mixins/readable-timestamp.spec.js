import mixins from '@/mixins'

describe('readable timestamp mixin', () => {
  it('should properly format the given data', () => {
    mixins.readableTimestamp(22231900).should.equal('03.12.2017 22:31:40')
  })
})
