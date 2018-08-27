import mixins from '@/mixins'
import store from '@/store'

const displayCrypto = function(value) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 8 })
}

const displayFiat = function(value) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2 })
}

describe('isDelegateByAddress mixin', () => {
  it('should return true when correct address is given', () => {
    store.dispatch('delegates/setDelegates', [ { username: 'DummyDelegate', address: 'DummyAddress' } ])
    expect(mixins.isDelegateByAddress('DummyAddress')).toBe(true)
  })

  it('should return false when no delegate can be found for given address', () => {
    store.dispatch('delegates/setDelegates', [ { username: 'DummyDelegate', address: 'DummyAddress' } ])
    expect(mixins.isDelegateByAddress('UnknownDummyAddress')).toBe(false)
  })
})

describe('isDelegateByPublicKey mixin', () => {
  it('should return true when correct public key is given', () => {
    store.dispatch('delegates/setDelegates', [ { username: 'DummyDelegate', publicKey: 'DummyKey' } ])
    expect(mixins.isDelegateByPublicKey('DummyKey')).toBe(true)
  })

  it('should return false when no delegate can be found for given public key', () => {
    store.dispatch('delegates/setDelegates', [ { username: 'DummyDelegate', publicKey: 'DummyKey' } ])
    expect(mixins.isDelegateByPublicKey('UnknownDummyKey')).toBe(false)
  })
})

describe('rawCurrency mixin', () => {
  it('should display selected cryptocurrency with 8 digits or less', () => {
    store.dispatch('network/setToken', 'ARK')
    expect(mixins.rawCurrency(10.1234567891234, 'ARK')).toEqual(displayCrypto(10.12345679))
    expect(mixins.rawCurrency(10.1234567891234, 'ETH')).toEqual(displayCrypto(10.12345679))
    expect(mixins.rawCurrency(10.1234567891234, 'BTC')).toEqual(displayCrypto(10.12345679))
    expect(mixins.rawCurrency(10.12345, 'ARK')).toEqual(displayCrypto(10.12345))
  })

  it('should display non-cryptocurrency always with 2 digits', () => {
    store.dispatch('network/setToken', 'ARK')
    expect(mixins.rawCurrency(10.1234567891, 'USD')).toEqual(displayFiat(10.12))
    expect(mixins.rawCurrency(10.1234567891, 'AUD')).toEqual(displayFiat(10.12))
    expect(mixins.rawCurrency(10.1234567891, 'EUR')).toEqual(displayFiat(10.12))
    expect(mixins.rawCurrency(10.1, 'USD')).toEqual(displayFiat(10.10))
    expect(mixins.rawCurrency(10, 'USD')).toEqual(displayFiat(10.00))
  })
})

describe('readableFiat mixin', () => {
  it('should display fiat currency with two digits', () => {
    store.dispatch('currency/setName', 'USD')
    store.dispatch('ui/setLocale', 'en-US')
    expect(mixins.readableFiat(10.234)).toEqual('$10.23')
    expect(mixins.readableFiat(10.23423478592034)).toEqual('$10.23')
  })
})

describe('readableCrypto mixin', () => {
  it('should return crypto value in readable format', () => {
    expect(mixins.readableCrypto(10 * Math.pow(10, 8), false)).toEqual(displayCrypto(10))
    expect(mixins.readableCrypto(10.12345678912345 * Math.pow(10, 8), false)).toEqual(displayCrypto(10.12345679))
    expect(mixins.readableCrypto(10.1234 * Math.pow(10, 8), false)).toEqual(displayCrypto(10.1234))
    expect(mixins.readableCrypto(10 * Math.pow(10, 8), false, 4)).toEqual(displayCrypto(10))
    expect(mixins.readableCrypto(10.123456 * Math.pow(10, 8), false, 4)).toEqual(displayCrypto(10.1235))
    expect(mixins.readableCrypto(10.123456789123456789 * Math.pow(10, 8), false, 10)).toEqual(Number(10.123456789123456789).toLocaleString(undefined, { maximumFractionDigits: 10 }))
  })

  it('should return crypto value in readable format, including symbol', () => {
    store.dispatch('network/setSymbol', 'Ѧ')
    expect(mixins.readableCrypto(10 * Math.pow(10, 8))).toEqual(displayCrypto(10) + ' Ѧ')
    expect(mixins.readableCrypto(10 * Math.pow(10, 8), true)).toEqual(displayCrypto(10) + ' Ѧ')
    expect(mixins.readableCrypto(10.12345678912345 * Math.pow(10, 8), true)).toEqual(displayCrypto(10.12345679) + ' Ѧ')
    expect(mixins.readableCrypto(10.1234 * Math.pow(10, 8), true)).toEqual(displayCrypto(10.1234) + ' Ѧ')
  })

  it('should return nothing if undefined value is given', () => {
    expect(mixins.readableCrypto()).toBeUndefined()
    expect(mixins.readableCrypto(undefined)).toBeUndefined()
  })
})

describe('networkToken mixin', () => {
  it('should return the set network token', () => {
    store.dispatch('network/setToken', 'ARK')
    expect(mixins.networkToken()).toEqual('ARK')
  })
})
