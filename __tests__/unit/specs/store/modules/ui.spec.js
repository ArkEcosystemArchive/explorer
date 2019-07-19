import store from '@/store'

describe('Store > UI', () => {
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

  it("should have 'day' as the default price chart period", () => {
    expect(store.getters['ui/priceChartPeriod']).toEqual('day')
  })

  it('should set the price chart period', () => {
    store.dispatch('ui/setPriceChartPeriod', 'week')

    expect(store.getters['ui/priceChartPeriod']).toEqual('week')
  })

  it('should have English set as default language', () => {
    expect(store.getters['ui/language']).toEqual('en-GB')
  })

  it('should set the language', () => {
    store.dispatch('ui/setLanguage', 'nl-NL')

    expect(store.getters['ui/language']).toEqual('nl-NL')
  })

  it('should have navigator or English set as default locale', () => {
    expect(store.getters['ui/locale']).toEqual(navigator.language || 'en-GB')
  })

  it('should set the locale', () => {
    store.dispatch('ui/setLocale', 'nl-NL')

    expect(store.getters['ui/locale']).toEqual('nl-NL')
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
