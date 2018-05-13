import mixins from '@/mixins'

describe('truncate mixin', () => {
  it('should properly truncate the given data, if given length is smaller than value', () => {
    expect(mixins.truncate('Hello World', 1)).toEqual('...')
    expect(mixins.truncate('Hello World', 10)).toEqual('Hell...orld')
    expect(mixins.truncate('Hello Beautiful World', 12)).toEqual('Hello...World')
  }),

  it('should properly truncate the given data if no length is given', () => {
    expect(mixins.truncate('Hello World')).toEqual('Hello World')
    expect(mixins.truncate('Hello Beatiful World')).toEqual('Hello...World')
  }),

  it('should properly truncate the given data, when applicable', () => {
    expect(mixins.truncate('Hello World', -1)).toEqual('Hello World')
    expect(mixins.truncate('Hello World', 0)).toEqual('Hello World')
    expect(mixins.truncate('Hello World', 5)).toEqual('He...ld')
    expect(mixins.truncate('Hello World', 100)).toEqual('Hello World')
  })
})
