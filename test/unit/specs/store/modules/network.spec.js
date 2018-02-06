import store from '@/store'

describe('network store modules', () => {
  it('should set the network server', () => {
    store.dispatch('network/setServer', 'setServer')

    store.getters['network/server'].should.equal('setServer')
  })

  it('should set the network nethash', () => {
    store.dispatch('network/setNethash', 'setNethash')

    store.getters['network/nethash'].should.equal('setNethash')
  })

  it('should set the network alias', () => {
    store.dispatch('network/setAlias', 'setAlias')

    store.getters['network/alias'].should.equal('setAlias')
  })

  it('should set the network active delegates', () => {
    store.dispatch('network/setActiveDelegates', 'setActiveDelegates')

    store.getters['network/activeDelegates'].should.equal('setActiveDelegates')
  })

  it('should set the network token', () => {
    store.dispatch('network/setToken', 'setToken')

    store.getters['network/token'].should.equal('setToken')
  })

  it('should set the network symbol', () => {
    store.dispatch('network/setSymbol', 'setSymbol')

    store.getters['network/symbol'].should.equal('setSymbol')
  })

  it('should set the network currencies', () => {
    store.dispatch('network/setCurrencies', 'setCurrencies')

    store.getters['network/currencies'].should.equal('setCurrencies')
  })

  it('should set the network known wallets', () => {
    store.dispatch('network/setKnownWallets', 'setKnownWallets')

    store.getters['network/knownWallets'].should.equal('setKnownWallets')
  })

  it('should set the network supply', () => {
    store.dispatch('network/setSupply', 'setSupply')

    store.getters['network/supply'].should.equal('setSupply')
  })

  it('should set the network height', () => {
    store.dispatch('network/setHeight', 'setHeight')

    store.getters['network/height'].should.equal('setHeight')
  })
})
