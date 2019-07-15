import store from '@/store'

describe('Store > Currency', () => {
  it('Should set the currency name', () => {
    store.dispatch('currency/setName', 'magical-pixel-currency')

    expect(store.getters['currency/name']).toEqual('magical-pixel-currency')
  })

  it('Should set the currency rate', () => {
    store.dispatch('currency/setRate', 123)

    expect(store.getters['currency/rate']).toEqual(123)
  })

  it('Should set the currency symbol', () => {
    store.dispatch('currency/setSymbol', 'magical-pixel-symbol')

    expect(store.getters['currency/symbol']).toEqual('magical-pixel-symbol')
  })

  it('Should set the last conversion rate', () => {
    store.dispatch('currency/setLastConversion', {
      to: 'USD',
      timestamp: 1533772799,
      rate: 0.8034
    })

    expect(store.getters['currency/lastConversion']).toEqual({
      to: 'USD',
      timestamp: 1533772799,
      rate: 0.8034
    })
  })
})
