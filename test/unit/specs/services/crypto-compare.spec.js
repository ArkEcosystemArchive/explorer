import cryptoCompareService from '@/services/crypto-compare'
import store from '@/store'

describe('CryptoCompare Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io:8443/api')
    store.dispatch('network/setToken', 'ARK')
    store.dispatch('currency/setName', 'USD')
  })

  it('should return day values', async () => {
    const data = await cryptoCompareService.day()
    expect(data.labels.length).toBe(25)
    expect(data.datasets.length).toBe(25)
  })

  it('should return week values', async () => {
    const data = await cryptoCompareService.week()
    expect(data.labels.length).toBe(8)
    expect(data.datasets.length).toBe(8)
  })

  it('should return month values', async () => {
    const data = await cryptoCompareService.month()
    expect(data.labels.length).toBeGreaterThanOrEqual(29)
    expect(data.datasets.length).toBeGreaterThanOrEqual(29)
  })

  it('should return quarter values', async () => {
    const data = await cryptoCompareService.quarter()
    expect(data.labels.length).toBe(121)
    expect(data.datasets.length).toBe(121)
  })

  it('should return year values', async () => {
    const data = await cryptoCompareService.year()
    expect(data.labels.length).toBeGreaterThanOrEqual(366)
    expect(data.datasets.length).toBeGreaterThanOrEqual(366)
  })

  it('should return year values, even if token matches currency', async () => {
    store.dispatch('currency/setName', 'ARK')
    const data = await cryptoCompareService.year()
    expect(data.labels.length).toBeGreaterThanOrEqual(366)
    expect(data.datasets.length).toBeGreaterThanOrEqual(366)
  })
})
