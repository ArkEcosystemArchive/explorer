import store from '@/store'

describe('Store > Network', () => {
  it('Should set the network defaults', () => {
    store.dispatch('network/setDefaults', 'setDefaults')

    expect(store.getters['network/defaults']).toEqual('setDefaults')
  })

  it('Should set the network server', () => {
    store.dispatch('network/setServer', 'setServer')

    expect(store.getters['network/server']).toEqual('setServer')
  })

  it('Should set the network nethash', () => {
    store.dispatch('network/setNethash', 'setNethash')

    expect(store.getters['network/nethash']).toEqual('setNethash')
  })

  it('Should set the network alias', () => {
    store.dispatch('network/setAlias', 'setAlias')

    expect(store.getters['network/alias']).toEqual('setAlias')
  })

  it('Should set the network active delegates', () => {
    store.dispatch('network/setActiveDelegates', 'setActiveDelegates')

    expect(store.getters['network/activeDelegates']).toEqual('setActiveDelegates')
  })

  it('Should set the network reward offset', () => {
    store.dispatch('network/setRewardOffset', 'setRewardOffset')

    expect(store.getters['network/rewardOffset']).toEqual('setRewardOffset')
  })

  it('Should set the network token', () => {
    store.dispatch('network/setToken', 'setToken')

    expect(store.getters['network/token']).toEqual('setToken')
  })

  it('Should set the network symbol', () => {
    store.dispatch('network/setSymbol', 'setSymbol')

    expect(store.getters['network/symbol']).toEqual('setSymbol')
  })

  it('Should set the network currencies', () => {
    store.dispatch('network/setCurrencies', 'setCurrencies')

    expect(store.getters['network/currencies']).toEqual('setCurrencies')
  })

  it('Should set the network known wallets', () => {
    store.dispatch('network/setKnownWallets', 'setKnownWallets')

    expect(store.getters['network/knownWallets']).toEqual('setKnownWallets')
  })

  it('Should set the network supply', () => {
    store.dispatch('network/setSupply', 'setSupply')

    expect(store.getters['network/supply']).toEqual('setSupply')
  })

  it('Should set the network height', () => {
    store.dispatch('network/setHeight', 'setHeight')

    expect(store.getters['network/height']).toEqual('setHeight')
  })
})
