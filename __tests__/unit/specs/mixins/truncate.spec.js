import mixins from '@/mixins'

describe('truncate mixin', () => {
  it('should properly truncate the given data, if given length is smaller than value', () => {
    expect(mixins.truncate('Hello World', 1)).toEqual('Hello Worl...')
    expect(mixins.truncate('Hello World', 10)).toEqual('Hell...rld')
    expect(mixins.truncate('Hello Beautiful World', 13)).toEqual('Hello...World')
  })

  it('should properly truncate the given data if no length is given', () => {
    expect(mixins.truncate('Hello World')).toEqual('Hello World')
    expect(mixins.truncate('Hello Beatiful World')).toEqual('Hello...World')
  })

  it('should properly truncate the given data, when applicable', () => {
    expect(mixins.truncate('Hello World', 5)).toEqual('H...d')
    expect(mixins.truncate('Hello World', 100)).toEqual('Hello World')
  })

  it('should properly format the given data', () => {
    expect(mixins.truncate('Hello World', 8)).toEqual('Hel...ld')
    expect(mixins.truncate('Hello World', 8, 'left')).toEqual('...World')
    expect(mixins.truncate('Hello World', 8, 'middle')).toEqual('Hel...ld')
    expect(mixins.truncate('Hello World', 8, 'right')).toEqual('Hello...')
    expect(mixins.truncate('ThisIsA24CharacterString', 24)).toEqual('ThisIsA24CharacterString')
    expect(mixins.truncate('ThisIsA24CharacterString', 23)).toEqual('ThisIsA24C...cterString')
    expect(mixins.truncate('&ThisIsA25CharacterString', 24)).toEqual('&ThisIsA25C...cterString')
  })

  it('should return original value if incorrect "where" is specified', () => {
    expect(mixins.truncate('Hello World', 8, 'something')).toEqual('Hello World')
  })
})
