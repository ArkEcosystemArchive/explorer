import mixins from '@/mixins'

describe('truncate mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.truncate('Hello World', 8)).toEqual('Hello...World')
  })
})
