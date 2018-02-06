import mixins from '@/mixins'

describe('truncate mixin', () => {
  it('should properly format the given data', () => {
    mixins.truncate('Hello World', 8).should.equal('Hello...World')
  })
})
