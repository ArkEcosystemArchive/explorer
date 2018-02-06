import store from '@/store'

describe('currency store modules', () => {
  it('should set the currency name', () => {
    store.dispatch('currency/setName', 'magical-pixel-currency')

    store.getters['currency/name'].should.equal('magical-pixel-currency')
  })

  it('should set the currency rate', () => {
    store.dispatch('currency/setRate', 123)

    store.getters['currency/rate'].should.equal(123)
  })

  it('should set the currency symbol', () => {
    store.dispatch('currency/setSymbol', 'magical-pixel-symbol')

    store.getters['currency/symbol'].should.equal('magical-pixel-symbol')
  })
})
