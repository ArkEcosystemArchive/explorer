import mixins from '@/mixins'

describe('truncate mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.truncate('Hello World', 8)).toEqual('Hel...ld')
    expect(mixins.truncate('Hello World', 8, 'left')).toEqual('...World')
    expect(mixins.truncate('Hello World', 8, 'middle')).toEqual('Hel...ld')
    expect(mixins.truncate('Hello World', 8, 'right')).toEqual('Hello...')
    expect(mixins.truncate('ThisIsA24CharacterString', 24)).toEqual('ThisIsA24CharacterString')
    expect(mixins.truncate('ThisIsA24CharacterString', 23)).toEqual('ThisIsA24C...cterString')
    expect(mixins.truncate('&ThisIsA25CharacterString', 24)).toEqual('&ThisIsA25C...cterString')
  })
})
