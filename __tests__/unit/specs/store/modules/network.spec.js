import store from '@/store'

describe('Store > Network', () => {
  it('should set the network defaults', () => {
    store.dispatch('network/setDefaults', 'setDefaults')

    expect(store.getters['network/defaults']).toEqual('setDefaults')
  })

  it('should set the network server', () => {
    store.dispatch('network/setServer', 'setServer')

    expect(store.getters['network/server']).toEqual('setServer')
  })

  it('should set the network nethash', () => {
    store.dispatch('network/setNethash', 'setNethash')

    expect(store.getters['network/nethash']).toEqual('setNethash')
  })

  it('should set the network alias', () => {
    store.dispatch('network/setAlias', 'setAlias')

    expect(store.getters['network/alias']).toEqual('setAlias')
  })

  it('should set the network active delegates', () => {
    store.dispatch('network/setActiveDelegates', 'setActiveDelegates')

    expect(store.getters['network/activeDelegates']).toEqual('setActiveDelegates')
  })

  it('should set the network reward offset', () => {
    store.dispatch('network/setRewardOffset', 'setRewardOffset')

    expect(store.getters['network/rewardOffset']).toEqual('setRewardOffset')
  })

  it('should set the network token', () => {
    store.dispatch('network/setToken', 'setToken')

    expect(store.getters['network/token']).toEqual('setToken')
  })

  it('should set the network symbol', () => {
    store.dispatch('network/setSymbol', 'setSymbol')

    expect(store.getters['network/symbol']).toEqual('setSymbol')
  })

  it('should set the network currencies', () => {
    store.dispatch('network/setCurrencies', 'setCurrencies')

    expect(store.getters['network/currencies']).toEqual('setCurrencies')
  })

  it('should set the network known wallets', () => {
    store.dispatch('network/setKnownWallets', 'setKnownWallets')

    expect(store.getters['network/knownWallets']).toEqual('setKnownWallets')
  })

  it('should set the network supply', () => {
    store.dispatch('network/setSupply', 'setSupply')

    expect(store.getters['network/supply']).toEqual('setSupply')
  })

  it('should set the network height', () => {
    store.dispatch('network/setHeight', 'setHeight')

    expect(store.getters['network/height']).toEqual('setHeight')
  })
})
