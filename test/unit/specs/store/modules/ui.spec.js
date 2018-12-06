import store from '@/store'

describe('ui store module', () => {
  it('should enable the night mode', () => {
    store.dispatch('ui/setNightMode', true)

    expect(store.getters['ui/nightMode']).toEqual(true)
  })

  it('should disable the night mode', () => {
    store.dispatch('ui/setNightMode', false)

    expect(store.getters['ui/nightMode']).toEqual(false)
  })

  it('should show the price chart', () => {
    store.dispatch('ui/setPriceChart', true)

    expect(store.getters['ui/priceChart']).toEqual(true)
  })

  it('should hide the price chart', () => {
    store.dispatch('ui/setPriceChart', false)

    expect(store.getters['ui/priceChart']).toEqual(false)
  })

  it('should have English set as default language', () => {
    expect(store.getters['ui/language']).toEqual('en-gb')
  })

  it('should set the language', () => {
    store.dispatch('ui/setLanguage', 'nl')

    expect(store.getters['ui/language']).toEqual('nl')
  })

  it('should have navigator or English set as default locale', () => {
    expect(store.getters['ui/locale']).toEqual(navigator.language || 'en-gb')
  })

  it('should set the locale', () => {
    store.dispatch('ui/setLocale', 'nl')

    expect(store.getters['ui/locale']).toEqual('nl')
  })

  it('should set the header type', () => {
    store.dispatch('ui/setHeaderType', 'headerType')

    expect(store.getters['ui/headerType']).toEqual('headerType')
  })

  it('should show the menu', () => {
    store.dispatch('ui/setMenuVisible', true)

    expect(store.getters['ui/menuVisible']).toEqual(true)
  })

  it('should hide the menu', () => {
    store.dispatch('ui/setMenuVisible', false)

    expect(store.getters['ui/menuVisible']).toEqual(false)
  })
})
