import mixins from '@/mixins'

describe('capitalize mixin', () => {
  it('should capitalize the first letter of the string', () => {
    expect(mixins.capitalize('hello world')).toEqual('Hello world')
    expect(mixins.capitalize('hELLO WORLD')).toEqual('HELLO WORLD')
  })

  it('should keep the first letter capitalized', () => {
    expect(mixins.capitalize('Hello world')).toEqual('Hello world')
  })

  it('should do nothing when empty string passed', () => {
    expect(mixins.capitalize('')).toEqual('')
  })
})
