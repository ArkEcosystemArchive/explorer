import store from '@/store'

describe('ui store module', () => {
  it('should enable the night mode', () => {
    store.dispatch('ui/setNightMode', true)

    store.getters['ui/nightMode'].should.equal(true)
  })

  it('should disable the night mode', () => {
    store.dispatch('ui/setNightMode', false)

    store.getters['ui/nightMode'].should.equal(false)
  })

  it('should show the price chart', () => {
    store.dispatch('ui/setPriceChart', true)

    store.getters['ui/priceChart'].should.equal(true)
  })

  it('should hide the price chart', () => {
    store.dispatch('ui/setPriceChart', false)

    store.getters['ui/priceChart'].should.equal(false)
  })

  it('should set the language', () => {
    store.dispatch('ui/setLanguage', 'en')

    store.getters['ui/language'].should.equal('en')
  })

  it('should set the header type', () => {
    store.dispatch('ui/setHeaderType', 'headerType')

    store.getters['ui/headerType'].should.equal('headerType')
  })

  it('should show the menu', () => {
    store.dispatch('ui/setMenuVisible', true)

    store.getters['ui/menuVisible'].should.equal(true)
  })

  it('should hide the menu', () => {
    store.dispatch('ui/setMenuVisible', false)

    store.getters['ui/menuVisible'].should.equal(false)
  })
})
