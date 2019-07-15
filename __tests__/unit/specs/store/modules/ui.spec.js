import store from '@/store'

describe('Store > UI', () => {
  it('Should enable the night mode', () => {
    store.dispatch('ui/setNightMode', true)

    expect(store.getters['ui/nightMode']).toEqual(true)
  })

  it('Should disable the night mode', () => {
    store.dispatch('ui/setNightMode', false)

    expect(store.getters['ui/nightMode']).toEqual(false)
  })

  it('Should show the price chart', () => {
    store.dispatch('ui/setPriceChart', true)

    expect(store.getters['ui/priceChart']).toEqual(true)
  })

  it('Should hide the price chart', () => {
    store.dispatch('ui/setPriceChart', false)

    expect(store.getters['ui/priceChart']).toEqual(false)
  })

  it("should have 'day' as the default price chart period", () => {
    expect(store.getters['ui/priceChartPeriod']).toEqual('day')
  })

  it('Should set the price chart period', () => {
    store.dispatch('ui/setPriceChartPeriod', 'week')

    expect(store.getters['ui/priceChartPeriod']).toEqual('week')
  })

  it('Should have English set as default language', () => {
    expect(store.getters['ui/language']).toEqual('en-gb')
  })

  it('Should set the language', () => {
    store.dispatch('ui/setLanguage', 'nl')

    expect(store.getters['ui/language']).toEqual('nl')
  })

  it('Should have navigator or English set as default locale', () => {
    expect(store.getters['ui/locale']).toEqual(navigator.language || 'en-gb')
  })

  it('Should set the locale', () => {
    store.dispatch('ui/setLocale', 'nl')

    expect(store.getters['ui/locale']).toEqual('nl')
  })

  it('Should set the header type', () => {
    store.dispatch('ui/setHeaderType', 'headerType')

    expect(store.getters['ui/headerType']).toEqual('headerType')
  })

  it('Should show the menu', () => {
    store.dispatch('ui/setMenuVisible', true)

    expect(store.getters['ui/menuVisible']).toEqual(true)
  })

  it('Should hide the menu', () => {
    store.dispatch('ui/setMenuVisible', false)

    expect(store.getters['ui/menuVisible']).toEqual(false)
  })
})
