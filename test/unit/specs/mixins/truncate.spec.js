import mixins from '@/mixins'

describe('truncate mixin', () => {
  it('should properly truncate the given data', () => {
    expect(mixins.truncate('Hello World', 10)).toEqual('Hello...World')
    expect(mixins.truncate('Hello World', 100)).toEqual('Hello World')
    expect(mixins.truncate('Hello Beautiful World'), 10).toEqual('Hello...World')
  })
})
